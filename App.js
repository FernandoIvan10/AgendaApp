import { useState } from 'react';
import { Button, StyleSheet, Text, View, Modal, TextInput, FlatList, Pressable, SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { FontAwesome } from "@expo/vector-icons";

export default function App() {
  // Hooks
  // Contacto
  const [contacto, setContacto] = useState({
      nombre:'',
      telefono:'',
      descripcion:'',
    })
  // lista de contactos
  const [contactos, setContactos] = useState([]);
  // modal
  const [modalVisible, setModalVisible] = useState(false);
  // índice de edición
  const [indiceEdicion, setIndiceEdicion] = useState(null);

  // Método para abrir el Modal
  const abrirModal = () => {
    setModalVisible(true);
  }

  // Método para manejar los cambios en los campos
  const manejarCambio = (campo, valor) => {
    // Los campos se quedan igual, pero el campo especificado en el parámetro
    // cambia su valor por el valor especificado en el parámetro
    setContacto({...contacto, [campo]:valor})
  }

  // Método para cerrar el Modal
  const cerrarModal = () => {
    // Se cierra el modal
    setModalVisible(!modalVisible);
    // Se limpian los campos
    setContacto({
      nombre:'',
      telefono:'',
      descripcion:'',
    })
    // Se resetea el índice de edición
    setIndiceEdicion(null);
  }

  // Método para guardar un nuevo contacto o editar uno existente
  const guardarContacto = () => {
    // Valida que el usuario haya rellenado todos los campos
    if(contacto.nombre != '' && contacto.telefono != '' && contacto.descripcion != ''){
      // Verifica si está en modo edición
      if (indiceEdicion !== null) {
        // Actualiza el contacto en la lista
        const _contactos = [...contactos];
        _contactos[indiceEdicion] = contacto;
        setContactos(_contactos);
      } else {
        // Agrega el nuevo contacto
        setContactos([...contactos, contacto]);
      }
      // Cierra el modal
      cerrarModal();
      // Muestra un mensaje al usuario
      Toast.show({
        type: 'success',
        text1: indiceEdicion !== null ? 'Contacto editado exitosamente' : 'Contacto guardado exitosamente',
      });
    }else{
      // Le pide al usuario que llene todos los campos
      Toast.show({
        type: 'error',
        text1: 'Por favor, llena todos los campos',
      })
    }
  }

  // Componente que representa una tarjeta de contacto
  const Tarjeta = ({contacto, index})=>{
    return(
      // View que contiene todo el contenido
      <View style={styles.tarjeta}>
        <View style={styles.infoTarjeta}>
          {/* Muestra el nombre del contacto */}
          <Text style={styles.textoNombre}>{contacto.nombre}</Text>
          {/* Muestra el nombre del contacto */}
          <Text style={styles.textoTarjeta}>{contacto.telefono}</Text>
          {/* Muestra la descripción del contacto */}
          <Text style={styles.textoTarjeta}>{contacto.descripcion}</Text>
        </View>
        <View style={styles.contenedorIconos}>
          {/* Ícono para eliminar la tarea */}
          <Pressable onPress={()=>eliminarContacto(index)}>
              <FontAwesome name="trash-o" size={32} color="#D32626"></FontAwesome>
          </Pressable>
          {/* Ícono para editar la tarea */}
          <Pressable onPress={()=>manejarEdicion(contacto, index)}>
              <FontAwesome name="pencil" size={32} color="#AA5486"></FontAwesome>
          </Pressable>
        </View>
      </View>
    )
  }

  // método que elimina una tarea
  const eliminarContacto=(index)=>{
    // Se filtra la lista de contactos y se guarda el resultado
    const _contactos = contactos.filter((_, id)=>id!==index);
    // El resultado del filtrado se asigna al hook de contactos
    setContactos(_contactos)
  }

  // método que maneja la edición de un contacto
  const manejarEdicion=(contacto, index)=>{
    // Se actualiza el hook contacto con el objeto recibido
    setContacto({...contacto});
    // Se actualiza el índice del contacto en edición
    setIndiceEdicion(index);
    // Se muestra el modal para editar el contacto
    setModalVisible(true);
  }

  // Renderizado del componente
  return (
    <SafeAreaProvider style={styles.safeAreaProvider}>
      {/* View que contiene la screen principal */}
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.contenedorTituloBoton}>
        <View style={styles.contenedorTitulo}>
        {/* Título */}
        <Text style={styles.titulo}>Agenda</Text>
        </View>
        {/* Botón para agregar un nuevo contacto */}
        <Button
          onPress={abrirModal}
          title='Nuevo contacto'
          style={styles.button}
          color='#4E9F3D'
        />
        </View>
        {/* Modal que contiene el formulario para agregar un contacto */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={cerrarModal}
        >
          <View style={styles.contenedorModal}>
          <SafeAreaView style={styles.modal}>
          
          <View style={styles.contenedorTituloModal}>
            {/* Título */}
            <Text style={styles.titulo}>{indiceEdicion !== null ? 'Editar contacto' : 'Nuevo contacto'}</Text>
          </View>
            {/* Contenedor para los campos */}
            <View style={styles.contenedorCampos}>
              {/* Campo para agregar el nombre */}
              <TextInput
                value={contacto.nombre}
                onChangeText={(value)=> manejarCambio('nombre', value)}
                placeholder='Nombre'
                style={styles.campos}
              />
              {/* Campo para agregar el número de teléfono */}
              <TextInput
                value={contacto.telefono}
                onChangeText={(value)=> manejarCambio('telefono', value)}
                placeholder='Teléfono'
                style={styles.campos}
              />
              {/* Campo para agregar la descripción */}
              <TextInput
                value={contacto.descripcion}
                onChangeText={(value)=> manejarCambio('descripcion', value)}
                placeholder='Descripción'
                style={styles.campos}
              />
            </View>
            <View style={styles.botones}>
              {/* Botón para cancelar */}
              <Button
                onPress={cerrarModal}
                title='Cancelar'
                color='#D32626'
              />
              {/* Botón para guardar el nuevo contacto */}
              <Button
                onPress={guardarContacto}
                title='Guardar'
                color='#79D70F'
              />
            </View>
          </SafeAreaView>
          </View>
        </Modal>
        <View style={styles.listaContactos}>
        {/* Lista de contactos */}
        <FlatList
          data={contactos}
          renderItem={({item, index})=><Tarjeta contacto={item} index={index} />}
          keyExtractor={(item, index)=>index.toString()}
        />
        </View>
        {/*Toast que muestra mensajes al usuario */}
        <Toast />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  // Estilos de la tarjeta de contacto
  tarjeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#4E9F3D',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  // Estilos del contenido de la tarjeta
  infoTarjeta: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  // Estilo del nombre del contacto
  textoNombre:{
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  // Estilo del texto de la tarjeta
  textoTarjeta: {
    marginBottom: 5,
    fontSize: 15,
    color: '#fff',
    marginLeft: 15,
  },
  // Estilos del contenedor de iconos de la tarjeta
  contenedorIconos: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: 80,
  },

  // Estilos del SafeAreaProvider
  safeAreaProvider: {
    flex: 1,
  },
  // Estilos del SafeAreaView
  safeAreaView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFF',
  },

  // Estilos del contenedor del título y botón de la pantalla principal
  contenedorTituloBoton: {
    marginTop: 40,
    width: '110%',
    alignItems: 'center',
    marginVertical: 20,
  },
  // Estilos del contenedor del título
  contenedorTitulo:{
    backgroundColor: '#1E5128',
    width: '100%',
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Estilo de los títulos
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    color: '#fff',
  },

  // Estilos del contenedor del modal
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 0,
    marginHorizontal: 20,
    width: '90%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  // Contenedor principal para centrar el modal
  contenedorModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  // Estilos del contenedor del título
  contenedorTituloModal:{
    backgroundColor: '#4E9F3D',
    width: '100%',
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0, // Asegura que no intente compartir espacio adicional
    alignSelf: 'stretch', // Garantiza que ocupe todo el ancho
  },

  // Estilos para el contenedor de campos del formulario
  contenedorCampos: {
    width: '100%',
    marginLeft: 20,
  },
  // Estilo para los campos del formulario
  campos:{
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    width: '94%',
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  // Estilos para el contenedor de botones dentro del modal
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    width: '100%',
    marginBottom: 20,
  },
  
  // Estilos de la lista de contactos
  listaContactos: {
    width: '100%',
    flex: 1,
    marginTop: 20,
  },
});