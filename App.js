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
          <Text style={styles.textoTarjeta}>{contacto.nombre}</Text>
          {/* Muestra el nombre del contacto */}
          <Text style={styles.textoTarjeta}>{contacto.telefono}</Text>
          {/* Muestra la descripción del contacto */}
          <Text style={styles.textoTarjeta}>{contacto.descripcion}</Text>
        </View>
        <View style={styles.iconsContainer}>
          {/* Ícono para eliminar la tarea */}
          <Pressable onPress={()=>eliminarContacto(index)}>
              <FontAwesome name="trash-o" size={32} color="#000"></FontAwesome>
          </Pressable>
          {/* Ícono para editar la tarea */}
          <Pressable onPress={()=>manejarEdicion(contacto, index)}>
              <FontAwesome name="pencil" size={32} color="#000"></FontAwesome>
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
        {/* Título */}
        <Text style={styles.titulo}>Agenda</Text>
        {/* Botón para agregar un nuevo contacto */}
        <Button
          onPress={abrirModal}
          title='Nuevo contacto'
          color='#000000'
        />
        </View>
        {/* Modal que contiene el formulario para agregar un contacto */}
        <Modal
          animationType="fade"
          trasnparent={true}
          visible={modalVisible}
          onRequestClose={cerrarModal}
        >
          <SafeAreaView style={styles.modal}>
            {/*Toast que muestra mensajes al usuario */}
            <Toast />
            {/* Título */}
            <Text style={styles.titulo}>{indiceEdicion !== null ? 'Editar contacto' : 'Nuevo contacto'}</Text>
            {/* Contenedor para los campos */}
            <View style={styles.campos}>
              {/* Campo para agregar el nombre */}
              <TextInput
                value={contacto.nombre}
                onChangeText={(value)=> manejarCambio('nombre', value)}
                placeholder='Nombre'
              />
              {/* Campo para agregar el número de teléfono */}
              <TextInput
                value={contacto.telefono}
                onChangeText={(value)=> manejarCambio('telefono', value)}
                placeholder='Teléfono'
              />
              {/* Campo para agregar la descripción */}
              <TextInput
                value={contacto.descripcion}
                onChangeText={(value)=> manejarCambio('descripcion', value)}
                placeholder='Descripción'
              />
            </View>
            <View style={styles.botones}>
              {/* Botón para cancelar */}
              <Button
                onPress={cerrarModal}
                title='Cancelar'
                color='#000000'
              />
              {/* Botón para guardar el nuevo contacto */}
              <Button
                onPress={guardarContacto}
                title='Guardar'
                color='#000000'
              />
            </View>
          </SafeAreaView>
        </Modal>
        <View style={styles.listaContactos}>
        {/* Lista de contactos */}
        <FlatList
          data={contactos}
          renderItem={({item, index})=><Tarjeta contacto={item} index={index} />}
          keyExtractor={(item, index)=>index.toString()}
        />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
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
  },

  // Estilos del contenedor del modal
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },

  // Estilos para los campos del formulario
  campos: {
    width: '100%',
    marginVertical: 10,
  },

  // Estilos para los botones dentro del modal
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },

  // Estilos de la tarjeta de contacto
  tarjeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  infoTarjeta: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  textoTarjeta: {
    marginBottom: 5,
    fontSize: 14,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: 80,
  },
  // Estilos del contenedor del título y botón de la pantalla principal
  contenedorTituloBoton: {
    marginTop: 40,
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  // Estilos de la lista de contactos
  listaContactos: {
    width: '100%',
    flex: 1,
    marginTop: 20,
  },

  // Estilos de los textos
  text: {
    fontSize: 16,
    marginVertical: 5,
  },

  // Estilos para los campos de texto de entrada
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },

  // Estilos del botón
  button: {
    width: '45%',
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },

  // Estilos de los iconos
  icon: {
    marginLeft: 10,
    marginTop: 5,
  },
});