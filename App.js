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
          {/* Muestra el nombre del contacto */}
          <Text>{contacto.nombre}</Text>
          {/* Muestra el nombre del contacto */}
          <Text>{contacto.telefono}</Text>
          {/* Muestra la descripción del contacto */}
          <Text>{contacto.descripcion}</Text>
          {/* Ícono para eliminar la tarea */}
          <Pressable onPress={()=>eliminarContacto(index)}>
              <FontAwesome name="trash-o" size={32} color="blue"></FontAwesome>
          </Pressable>
          {/* Ícono para editar la tarea */}
          <Pressable onPress={()=>manejarEdicion(contacto, index)}>
              <FontAwesome name="pencil" size={32} color="blue"></FontAwesome>
          </Pressable>
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
    <SafeAreaProvider>
      {/* View que contiene la screen principal */}
      <SafeAreaView style={styles.contenedor}>
        {/* Título */}
        <Text style={styles.titulo}>Agenda</Text>

        {/* Botón para agregar un nuevo contacto */}
        <Button
          onPress={abrirModal}
          title='Nuevo contacto'
          color='#000000'
        />
        {/* Modal que contiene el formulario para agregar un contacto */}
        <Modal
          animationType="fade"
          trasnparent={true}
          visible={modalVisible}
          onRequestClose={cerrarModal}
        >
          <SafeAreaView>
            {/*Toast que muestra mensajes al usuario */}
            <Toast />
            {/* Título */}
            <Text style={styles.titulo}>{indiceEdicion !== null ? 'Editar contacto' : 'Nuevo contacto'}</Text>
            {/* Contenedor para los campos */}
            <View>
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
            <View>
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
        {/* Lista de contactos */}
        <FlatList
          data={contactos}
          renderItem={({item, index})=><Tarjeta contacto={item} index={index} />}
          keyExtractor={(item, index)=>index.toString()}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  // Estilos del View
  contenedor: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Estilos del titulo
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  // Estilos de la tarjeta de contacto
  tarjeta:{
    backgroundColor: 'lightgray',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 10,
    borderRadius: 10
  },
});