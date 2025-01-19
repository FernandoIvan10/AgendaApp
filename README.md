# AgendaApp - React Native (Expo)

Este es un proyecto sencillo de una agenda de contactos creada con **React Native** utilizando **Expo**. La aplicación permite crear, editar y eliminar contactos, pero no guarda la información de manera persistente (no usa base de datos).

## Características

- Crear, editar y eliminar contactos.
- Interfaz sencilla con campos de nombre, teléfono y descripción.
- Utiliza componentes de React Native como `Modal`, `FlatList`, y `Toast` para la interacción con el usuario.

## Tecnologías utilizadas

- **React Native**: Framework para aplicaciones móviles nativas.
- **Expo**: Herramienta que facilita el desarrollo y la ejecución de aplicaciones React Native.
- **react-native-toast-message**: Para mostrar mensajes al usuario.

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/FernandoIvan10/AgendaApp.git
2. Navega al directorio del proyecto:
   ```bash
   cd AgendaApp
3. Instala las dependencias usando Expo:
   ```bash
   npm install
4. Ejecuta el proyecto con Expo:
   ```bash
   npx expo start
5. Escanea el código QR con la app Expo Go para ver la aplicación en tu dispositivo móvil.

## Cómo usar

1. Al abrir la aplicación, verás la pantalla principal con un botón para agregar un nuevo contacto.
2. Para agregar un contacto, presiona el botón "Nuevo contacto" y completa los campos (nombre, teléfono, descripción).
3. Los contactos agregados aparecerán en una lista. Puedes editar o eliminar un contacto presionando los iconos correspondientes.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.