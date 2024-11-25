import { useState } from 'react';
import { Button, StyleSheet, Text, View, Modal, TextInput } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';


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
  }

  // Método para guardar un nuevo contacto
  const guardarContacto = () => {
    if(contacto.nombre && contacto.telefono && contacto.descripcion){
      setContactos([...contactos, contacto])
      cerrarModal()
    }else{
      Toast.show({
        type: 'error',
        text1: 'Por favor, llena todos los campos',
      })
    }
    
  }

  // Renderizado del componente
  return (
    <SafeAreaProvider>
      {/* View que contiene la screen principal */}
      <View style={styles.contenedor}>
        {/* Título */}
        <Text style={styles.titulo}>Agenda</Text>
        {/* Botón para agregar un nuevo contacto */}
        <Button
          onPress={abrirModal}
          title='Nuevo contacto'
          color='#000000'
        />
        <Modal
          animationType="fade"
          trasnparent={true}
          visible={modalVisible}
          onRequestClose={cerrarModal}
        >
          <View>
            {/* Título */}
            <Text style={styles.titulo}>Nuevo contacto</Text>
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
          </View>
        </Modal>
      </View>
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

});