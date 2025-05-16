# Proceso de Registro de Usuarios

Este documento detalla el flujo completo del proceso de registro de usuarios en la aplicación, incluyendo validación de datos, cifrado de contraseñas, interacción con la base de datos y generación de tokens.

## 1. Punto de entrada - Ruta de registro

El registro comienza en la ruta `/auth/register`, que está definida en `authRoutes.js`:
```javascript
router.post("/register", AuthController.register);
```

## 2. Controlador de autenticación - Método register

Cuando llega una solicitud POST a esta ruta, se ejecuta el método `register` del `AuthController` (definido en `authController.js`):

### a) Creación del objeto usuario
```javascript
var user = new usr_users(req.body);
```
- Se crea una nueva instancia del modelo `usr_users` utilizando los datos enviados en el cuerpo de la solicitud (req.body).
- El modelo `usr_users` incluye campos como:
  - iId: Identificador del usuario
  - sName: Nombre del usuario
  - sEmail: Correo electrónico
  - sPassword: Contraseña
  - sProfilePicture: Imagen de perfil
  - sPhoneNumber: Número de teléfono
  - sLada: Código de país para el teléfono
  - sIdExternalProvider: Identificador de proveedor externo
  - iIdRegistrationProvider: Identificador del proveedor de registro
  - dtRegistrationDate: Fecha de registro
  - dtModificationDate: Fecha de modificación

### b) Validación de datos
Se realizan varias validaciones:

1. Si se proporciona un número de teléfono, se valida su formato:
```javascript
if (user.sPhoneNumber && !ValidationService.isValidPhoneNumber(user.sPhoneNumber)) {
  throw new TypeError("Invalid phone number format");
}
```
- La validación utiliza una expresión regular: `/^\+?[1-9]\d{1,14}$/` (Estándar E.164 para números de teléfono)

2. Si se proporciona un código de país (lada), se valida su formato:
```javascript
if (user.sLada && !ValidationService.isValidLada(user.sLada)) {
  throw new TypeError("Invalid country code format");
}
```
- La validación utiliza una expresión regular: `/^\+[1-9]\d{0,3}$/` (Códigos de país comienzan con + y tienen 1-4 dígitos)

3. Se verifica que si se proporciona un número de teléfono, también se proporcione el código de país y viceversa:
```javascript
if ((user.sPhoneNumber && !user.sLada) || (!user.sPhoneNumber && user.sLada)) {
  throw new TypeError("Both phone number and country code must be provided");
}
```

### c) Cifrado de contraseña
```javascript
var sPasswordHashed = await cryptService.hashPassword(user.sPassword);
user.sPassword = sPasswordHashed;
```
- La contraseña se cifra utilizando bcrypt con un valor de "salt rounds" definido en la configuración.
- El servicio `cryptService.hashPassword()` utiliza `bcrypt.hash()` para generar un hash seguro de la contraseña.
- La contraseña cifrada reemplaza la contraseña en texto plano en el objeto usuario.

### d) Registro del usuario en la base de datos
```javascript
const privateUser = await AuthService.register(user);
```
- Se llama al método `register` del servicio `AuthService`.
- Este método establece el `iId` del usuario en -1 (indicando un nuevo usuario).
- Luego llama al procedimiento almacenado `usr_SP_user_merge` para insertar o actualizar el usuario en la base de datos:
  ```javascript
  user.iId = -1;
  var userBD = await usr_SP_user_merge(user).firstOrDefault();
  ```
- El procedimiento almacenado devuelve el usuario recién creado incluyendo su ID y otros campos generados por la base de datos.
- Se procesan algunos campos JSON en el objeto de usuario devuelto:
  ```javascript
  userBD.objMemories = JSON.parse(userBD.objMemories);
  userBD.objRoutine = JSON.parse(userBD.objRoutine);
  userBD.lastRoutine = JSON.parse(userBD.lastRoutine);
  ```

### e) Generación de tokens de autenticación
Una vez registrado el usuario, se generan tokens para autenticar al usuario:

1. Token de acceso:
```javascript
const { token, tokenExpiresIn } = jwtService.generateToken(privateUser);
```
- Se utiliza `jwtService.generateToken()` que genera un token JWT firmado con la clave secreta de JWT_TOKEN_SECRET.
- El token tiene un tiempo de expiración definido en JWT_TOKEN_EXPIRATION.
- El payload del token incluye la información del usuario.

2. Token de actualización:
```javascript
const { refreshToken, refreshTokenExpiresIn } = jwtService.generateRefreshToken(privateUser);
```
- Se utiliza `jwtService.generateRefreshToken()` que genera un token JWT firmado con la clave secreta de JWT_REFRESH_TOKEN_SECRET.
- Este token tiene un tiempo de expiración más largo definido en JWT_REFRESH_TOKEN_EXPIRATION.
- Se usa para obtener un nuevo token de acceso cuando el original expira.

### f) Respuesta al cliente
Finalmente, se envía una respuesta al cliente con el usuario y los tokens:
```javascript
res.status(200).json({
  user: privateUser,
  token: { result: token, expiresIn: tokenExpiresIn },
  refreshToken: {
    result: refreshToken,
    expiresIn: refreshTokenExpiresIn,
  },
});
```

## 3. Interacción con la base de datos - Procedimiento almacenado

El método `usr_SP_user_merge` en los procedimientos almacenados se utiliza para:
- Insertar un nuevo usuario cuando `iId` es -1
- Actualizar un usuario existente cuando `iId` es un valor positivo

## 4. Manejo de errores

Si ocurre algún error durante el proceso, se captura en el bloque catch:
```javascript
catch (error) {
  console.log(error);
  next(error);
}
```
- El error se registra en la consola
- Se pasa al siguiente middleware de manejo de errores usando `next(error)`

## Resumen del flujo de registro

1. El cliente envía una solicitud POST a `/auth/register` con los datos del usuario
2. Se crea una instancia del modelo `usr_users` con los datos recibidos
3. Se validan los datos, incluyendo número de teléfono y código de país si se proporcionan
4. Se cifra la contraseña del usuario usando bcrypt
5. Se inserta el usuario en la base de datos a través del procedimiento almacenado `usr_SP_user_merge`
6. Se generan tokens JWT para autenticación (token y refreshToken)
7. Se devuelve al cliente el usuario registrado y los tokens para iniciar sesión
8. Si hay algún error, se registra y se pasa al middleware de errores

Este proceso garantiza un registro seguro con validación de datos, cifrado de contraseñas y generación de tokens de autenticación.