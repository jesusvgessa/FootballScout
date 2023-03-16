<?php
$servidor = "localhost";
$baseDatos = "footballscout";
$user = "root";
$pass = "";

//Funciones

    function obtenerUsuario($id){
        try {
            $con = new PDO("mysql:host=" . $GLOBALS['servidor'] . ";dbname=" . $GLOBALS['baseDatos'], $GLOBALS['user'], $GLOBALS['pass']);
            /*
            La clase PDOStatement es la que trata las sentencias SQL. 
            Una instancia de PDOStatement se crea cuando se llama a PDO->prepare(), 
            y con ese objeto creado se llama a métodos como bindParam() para pasar valores o execute() para ejecutar sentencias. 
            PDO facilita el uso de sentencias preparadas en PHP, que mejoran el rendimiento y la seguridad de la aplicación. 
            Cuando se obtienen, insertan o actualizan datos, el esquema es: PREPARE -> [BIND] -> EXECUTE. 
            Se pueden indicar los parámetros en la sentencia con un interrogante "?" o mediante un nombre específico.
            */
            $sql = $con->prepare("SELECT * from usuarios where id=:id");
            $sql->bindParam(":id", $id); //Para evitar inyecciones SQL
            $sql->execute();
            $row = $sql->fetch(PDO::FETCH_ASSOC); //Recibimos la linea correspondiente en ROW
            $con = null; //Cerramos la conexión
            return $row;
        } catch (PDOException $e) {
            header("location: /php/error.html");
        }
    }

    function obtenerTodos($filtro){
        try {
            $con = new PDO("mysql:host=" . $GLOBALS['servidor'] . ";dbname=" . $GLOBALS['baseDatos'], $GLOBALS['user'], $GLOBALS['pass']);
            if($filtro=='nuevos'){
                $sql = $con->prepare("SELECT * from usuarios WHERE confirmado = '0';");
            }else{
                $sql = $con->prepare("SELECT * from usuarios WHERE confirmado = '1';");
            }
            $sql->execute();
            $miArray = [];
            while ($row = $sql->fetch(PDO::FETCH_ASSOC)) { //Haciendo uso de PDO iremos creando el array dinámicamente
                $miArray[] = $row; //https://www.it-swarm-es.com/es/php/rellenar-php-array-desde-while-loop/972445501/
            }
            $con = null; //Cerramos la conexión
        } catch (PDOException $e) {
            header("location: /php/error.html");
        }
        return $miArray;
    }

    function obtenerTodosUsuarios(){
        try {
            $con = new PDO("mysql:host=" . $GLOBALS['servidor'] . ";dbname=" . $GLOBALS['baseDatos'], $GLOBALS['user'], $GLOBALS['pass']);
            $sql = $con->prepare("SELECT * from usuarios;");
            $sql->execute();
            $miArray2 = [];
            while ($row = $sql->fetch(PDO::FETCH_ASSOC)) { //Haciendo uso de PDO iremos creando el array dinámicamente
                $miArray2[] = $row; //https://www.it-swarm-es.com/es/php/rellenar-php-array-desde-while-loop/972445501/
            }
            $con = null;
        } catch (PDOException $e) {
            header("location: /php/error.html");
        }
        return $miArray2;
    }
    
    function editarUsuario($id, $nombre, $apellidos, $correo)
    {
        $retorno = false;
        try {
            $con = new PDO("mysql:host=" . $GLOBALS['servidor'] . ";dbname=" . $GLOBALS['baseDatos'], $GLOBALS['user'], $GLOBALS['pass']);
            $sql = $con->prepare("UPDATE usuarios set nombre=:nombre, apellidos=:apellidos, correo=:correo where id=:id;");
            $sql->bindParam(":id", $id);
            $sql->bindParam(":nombre", $nombre);
            $sql->bindParam(":apellidos", $apellidos);
            $sql->bindParam(":correo", $correo);
            $sql->execute();
            if ($sql->rowCount() > 0) {
                $retorno = true;
            }
        } catch (PDOException $e) {
            header("location: /php/error.html");
        }
        $con = null; //Cerramos la conexión
        return $retorno;
    }

    function eliminarUsuario($id){
        $retorno = false;
        try{
            $con = new PDO("mysql:host=" . $GLOBALS['servidor'] . ";dbname=" . $GLOBALS['baseDatos'], $GLOBALS['user'], $GLOBALS['pass']);
            $sql = $con->prepare("DELETE from usuarios where id=:id");
            $sql->bindParam(":id", $id);
            $sql->execute();
            if ($sql->rowCount() > 0){
                $retorno = true;
            }
            $con = null; //Cerramos la conexión
        }catch(PDOException $e){
            header("location: /php/error.html");
        }
        return $retorno;
    }

    function eliminarEntrenadorEquipo($id){
        $retorno = false;
        $retorno2 = false;
        $id_equipo=obtenerEntrenador($id)['id_equipo'];
        try{
            $con = new PDO("mysql:host=" . $GLOBALS['servidor'] . ";dbname=" . $GLOBALS['baseDatos'], $GLOBALS['user'], $GLOBALS['pass']);
            $sql = $con->prepare("DELETE from entrenadores where id_usuario=:id");
            $sql->bindParam(":id", $id);
            $sql->execute();
            if ($sql->rowCount() > 0){
                $retorno = true;
            }
            $con = null; //Cerramos la conexión
        }catch(PDOException $e){
            header("location: /php/error.html");
        }
        try{
            $con = new PDO("mysql:host=" . $GLOBALS['servidor'] . ";dbname=" . $GLOBALS['baseDatos'], $GLOBALS['user'], $GLOBALS['pass']);
            $sql = $con->prepare("DELETE from equipos where id=:id");
            $sql->bindParam(":id", $id_equipo);
            $sql->execute();
            if ($sql->rowCount() > 0){
                $retorno2 = true;
            }
            $con = null; //Cerramos la conexión
        }catch(PDOException $e){
            header("location: /php/error.html");
        }
        return $retorno && $retorno2;
    }

    function confirmarUsuario($id){
        $retorno = false;
        try {
            $con = new PDO("mysql:host=" . $GLOBALS['servidor'] . ";dbname=" . $GLOBALS['baseDatos'], $GLOBALS['user'], $GLOBALS['pass']);
            $sql = $con->prepare("UPDATE usuarios  set confirmado='1' where id=:id;");
            $sql->bindParam(":id", $id);
            $sql->execute();
            if ($sql->rowCount() > 0) {
                $retorno = true;
            }
            $con = null; //Cerramos la conexión
        } catch (PDOException $e) {
            header("location: /php/error.html");
        }
        return $retorno;
    }

    function obtenerEquipos(){
        try {
            $con = new PDO("mysql:host=" . $GLOBALS['servidor'] . ";dbname=" . $GLOBALS['baseDatos'], $GLOBALS['user'], $GLOBALS['pass']);
            $sql = $con->prepare("SELECT * from equipos");
            $sql->execute();
            $miArray = [];
            while ($row = $sql->fetch(PDO::FETCH_ASSOC)) { //Haciendo uso de PDO iremos creando el array dinámicamente
                $miArray[] = $row; //https://www.it-swarm-es.com/es/php/rellenar-php-array-desde-while-loop/972445501/
            }
            $con = null; //Cerramos la conexión
        } catch (PDOException $e) {
            header("location: /php/error.html");
        }
        return $miArray;
    }

    function obtenerEquipo($id){
        try {
            $con = new PDO("mysql:host=" . $GLOBALS['servidor'] . ";dbname=" . $GLOBALS['baseDatos'], $GLOBALS['user'], $GLOBALS['pass']);
            $sql = $con->prepare("SELECT * from equipos WHERE id=:id");
            $sql->bindParam(":id", $id);
            $sql->execute();
            $row = $sql->fetch(PDO::FETCH_ASSOC); //Recibimos la linea correspondiente en ROW
            $con = null; //Cerramos la conexión
            return $row;
        } catch (PDOException $e) {
            header("location: /php/error.html");
        }
    }

    function insertarEquipo(){
        $equipos=obtenerEquipos();
        $nombreEquipo = "equipo".((string) sizeof($equipos));
        try {
            $con = new PDO("mysql:host=" . $GLOBALS['servidor'] . ";dbname=" . $GLOBALS['baseDatos'], $GLOBALS['user'], $GLOBALS['pass']);
            $sql = $con->prepare("INSERT into equipos values(null, :nombreEquipo, 'senior', null)");
            $sql->bindParam(":nombreEquipo", $nombreEquipo);
            $sql->execute();
            $id = $con->lastInsertId();
            $con = null;
        } catch (PDOException $e) {
            header("location: /php/error.html");
        }
        return $id != 0;
    }

    function obtenerEntrenadores(){
        try {
            $con = new PDO("mysql:host=" . $GLOBALS['servidor'] . ";dbname=" . $GLOBALS['baseDatos'], $GLOBALS['user'], $GLOBALS['pass']);
            $sql = $con->prepare("SELECT * from entrenadores");
            $sql->execute();
            $miArray = [];
            while ($row = $sql->fetch(PDO::FETCH_ASSOC)) { //Haciendo uso de PDO iremos creando el array dinámicamente
                $miArray[] = $row; //https://www.it-swarm-es.com/es/php/rellenar-php-array-desde-while-loop/972445501/
            }
            $con = null; //Cerramos la conexión
        } catch (PDOException $e) {
            header("location: /php/error.html");
        }
        return $miArray;
    }

    function obtenerEntrenador($id_usuario){
        try {
            $con = new PDO("mysql:host=" . $GLOBALS['servidor'] . ";dbname=" . $GLOBALS['baseDatos'], $GLOBALS['user'], $GLOBALS['pass']);
            $sql = $con->prepare("SELECT * FROM `entrenadores` WHERE id_usuario=:id_usuario;");
            $sql->bindParam(":id_usuario", $id_usuario); //Para evitar inyecciones SQL
            $sql->execute();
            $row = $sql->fetch(PDO::FETCH_ASSOC); //Recibimos la linea correspondiente en ROW
            $con = null; //Cerramos la conexión
            return $row;
        } catch (PDOException $e) {
            header("location: /php/error.html");
        }
    }

    function insertarEntrenador($id,$nombre,$apellidos){
        $equipos=obtenerEquipos();
        $id_equipo = $equipos[(sizeof($equipos)-1)]['id'];
        try {
            $con = new PDO("mysql:host=" . $GLOBALS['servidor'] . ";dbname=" . $GLOBALS['baseDatos'], $GLOBALS['user'], $GLOBALS['pass']);
            $sql = $con->prepare("INSERT into entrenadores values(null, :nombre , :apellidos , :id_equipo, :id_usuario)");
            $sql->bindParam(":nombre", $nombre);
            $sql->bindParam(":apellidos", $apellidos);
            $sql->bindParam(":id_equipo", $id_equipo);
            $sql->bindParam(":id_usuario", $id);
            $sql->execute();
            $id = $con->lastInsertId();
            $con = null;
            return $id != 0;
        } catch (PDOException $e) {
            echo $e;
        }
    }

    function obtenerJugadores(){
        try {
            $con = new PDO("mysql:host=" . $GLOBALS['servidor'] . ";dbname=" . $GLOBALS['baseDatos'], $GLOBALS['user'], $GLOBALS['pass']);
            $sql = $con->prepare("SELECT * from jugadores");
            $sql->execute();
            $miArray = [];
            while ($row = $sql->fetch(PDO::FETCH_ASSOC)) { //Haciendo uso de PDO iremos creando el array dinámicamente
                $miArray[] = $row; //https://www.it-swarm-es.com/es/php/rellenar-php-array-desde-while-loop/972445501/
            }
            $con = null; //Cerramos la conexión
        } catch (PDOException $e) {
            header("location: /php/error.html");
        }
        return $miArray;
    }

    function obtenerJugador($id){
        try {
            $con = new PDO("mysql:host=" . $GLOBALS['servidor'] . ";dbname=" . $GLOBALS['baseDatos'], $GLOBALS['user'], $GLOBALS['pass']);
            $sql = $con->prepare("SELECT * FROM `jugadores` WHERE id=:id;");
            $sql->bindParam(":id", $id); //Para evitar inyecciones SQL
            $sql->execute();
            $row = $sql->fetch(PDO::FETCH_ASSOC); //Recibimos la linea correspondiente en ROW
            $con = null; //Cerramos la conexión
            return $row;
        } catch (PDOException $e) {
            header("location: /php/error.html");
        }
    }

    function obtenerJugadoresEquipo($id_equipo){
        try {
            $con = new PDO("mysql:host=" . $GLOBALS['servidor'] . ";dbname=" . $GLOBALS['baseDatos'], $GLOBALS['user'], $GLOBALS['pass']);
            $sql = $con->prepare("SELECT * from jugadores WHERE id_equipo=:id_equipo");
            $sql->bindParam(":id_equipo", $id_equipo);
            $sql->execute();
            $miArray = [];
            while ($row = $sql->fetch(PDO::FETCH_ASSOC)) { //Haciendo uso de PDO iremos creando el array dinámicamente
                $miArray[] = $row; //https://www.it-swarm-es.com/es/php/rellenar-php-array-desde-while-loop/972445501/
            }
            $con = null; //Cerramos la conexión
        } catch (PDOException $e) {
            header("location: /php/error.html");
        }
        return $miArray;
    }

    function insertarJugador($nombre,$apellidos,$apodo,$dorsal,$pos,$avatar,$id_equipo){
        try {
            $con = new PDO("mysql:host=" . $GLOBALS['servidor'] . ";dbname=" . $GLOBALS['baseDatos'], $GLOBALS['user'], $GLOBALS['pass']);
            $sql = $con->prepare("INSERT into jugadores values(null, :id_equipo, :nombre, :apellidos, :apodo, :dorsal, :pos, :foto, 0, 0, 0, 0, 0, 0)");
            $sql->bindParam(":nombre", $nombre);
            $sql->bindParam(":apellidos", $apellidos);
            $sql->bindParam(":apodo", $apodo);
            $sql->bindParam(":dorsal", $dorsal);
            $sql->bindParam(":pos", $pos);
            $sql->bindParam(":foto", $avatar);
            $sql->bindParam(":id_equipo", $id_equipo);
            $sql->execute();
            $id = $con->lastInsertId();
            $con = null;
            return $id != 0;
        } catch (PDOException $e) {
            echo $e;
        }
    }

    function actualizarJugador($jugadorActual){
        //cojo los datos del jugador
        $jugador = obtenerJugador($jugadorActual->id);
        $partidos = ($jugador['partidos'] + 1);
        $minutosJugador= ($jugador['minutos'] + ($jugadorActual->minutos));
        $golesJugador= ($jugador['goles'] + ($jugadorActual->goles));
        $asistenciasJugador= ($jugador['asistencias'] + ($jugadorActual->asistencias));
        $tarjetaAmarillaJugador= ($jugador['tarjetaAmarilla'] + ($jugadorActual->tarjetaAmarilla));
        $tarjetaRojaJugador= ($jugador['tarjetaRoja'] + ($jugadorActual->tarjetaRoja));
        try {
            $con = new PDO("mysql:host=" . $GLOBALS['servidor'] . ";dbname=" . $GLOBALS['baseDatos'], $GLOBALS['user'], $GLOBALS['pass']);
            $sql = $con->prepare("UPDATE jugadores SET partidos=:partidos, minutos=:minutos, goles=:goles , asistencias=:asistencias, tarjetaAmarilla=:tarjetaAmarilla, tarjetaRoja=:tarjetaRoja WHERE id=:id;");
            $sql->bindParam(":id", $jugadorActual->id);
            $sql->bindParam(":partidos", $partidos);
            $sql->bindParam(":minutos", $minutosJugador);
            $sql->bindParam(":goles", $golesJugador);
            $sql->bindParam(":asistencias", $asistenciasJugador);
            $sql->bindParam(":tarjetaAmarilla", $tarjetaAmarillaJugador);
            $sql->bindParam(":tarjetaRoja", $tarjetaRojaJugador);
            $sql->execute();
            $con = null; //Cerramos la conexión
        } catch (PDOException $e) {
            header("location: /php/error.html");
        }
    }

    function insertarPartido($id_equipo,$jornada,$localidad,$resultado,$rival,$informe){
        try {
            $con = new PDO("mysql:host=" . $GLOBALS['servidor'] . ";dbname=" . $GLOBALS['baseDatos'], $GLOBALS['user'], $GLOBALS['pass']);
            $sql = $con->prepare("INSERT into partidos values(null, :id_equipo,:jornada,:localidad,:rival,:resultado,:informe)");
            $sql->bindParam(":id_equipo", $id_equipo);
            $sql->bindParam(":jornada", $jornada);
            $sql->bindParam(":localidad", $localidad);
            $sql->bindParam(":resultado", $resultado);
            $sql->bindParam(":rival", $rival);
            $sql->bindParam(":informe", $informe);
            $sql->execute();
            $id = $con->lastInsertId();
            $con = null;
            return $id != 0;
        } catch (PDOException $e) {
            header("location: /php/error.html");
        }
    }

    function obtenerPartidosEquipo($id_equipo){
        try {
            $con = new PDO("mysql:host=" . $GLOBALS['servidor'] . ";dbname=" . $GLOBALS['baseDatos'], $GLOBALS['user'], $GLOBALS['pass']);
            $sql = $con->prepare("SELECT * FROM partidos WHERE id_equipo=:id_equipo");
            $sql->bindParam(":id_equipo", $id_equipo);
            $sql->execute();
            $miArray = [];
            while ($row = $sql->fetch(PDO::FETCH_ASSOC)) { //Haciendo uso de PDO iremos creando el array dinámicamente
                $miArray[] = $row; //https://www.it-swarm-es.com/es/php/rellenar-php-array-desde-while-loop/972445501/
            }
            $con = null; //Cerramos la conexión
        } catch (PDOException $e) {
            header("location: /php/error.html");
        }
        return $miArray;
    }

    function obtenerPartido($id){
        try {
            $con = new PDO("mysql:host=" . $GLOBALS['servidor'] . ";dbname=" . $GLOBALS['baseDatos'], $GLOBALS['user'], $GLOBALS['pass']);
            $sql = $con->prepare("SELECT * FROM `partidos` WHERE id=:id;");
            $sql->bindParam(":id", $id); //Para evitar inyecciones SQL
            $sql->execute();
            $row = $sql->fetch(PDO::FETCH_ASSOC); //Recibimos la linea correspondiente en ROW
            $con = null; //Cerramos la conexión
            return $row;
        } catch (PDOException $e) {
            header("location: /php/error.html");
        }
    }
?>