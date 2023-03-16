-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-06-2022 a las 10:17:56
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `footballscout`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrenadores`
--

CREATE TABLE `entrenadores` (
  `id` tinyint(4) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `apellidos` varchar(40) NOT NULL,
  `id_equipo` tinyint(4) NOT NULL,
  `id_usuario` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `entrenadores`
--

INSERT INTO `entrenadores` (`id`, `nombre`, `apellidos`, `id_equipo`, `id_usuario`) VALUES
(1, 'nuria', 'fuentes', 1, 2),
(2, 'dani', 'muniz', 6, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos`
--

CREATE TABLE `equipos` (
  `id` tinyint(4) NOT NULL,
  `club` varchar(20) NOT NULL,
  `categoria` set('senior','juvenil','cadete','infantil') NOT NULL,
  `nivel` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `equipos`
--

INSERT INTO `equipos` (`id`, `club`, `categoria`, `nivel`) VALUES
(1, 'eusa', 'senior', NULL),
(6, 'equipo1', 'senior', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jugadores`
--

CREATE TABLE `jugadores` (
  `id` tinyint(4) NOT NULL,
  `id_equipo` tinyint(4) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `apellidos` varchar(40) NOT NULL,
  `apodo` varchar(20) NOT NULL,
  `dorsal` tinyint(2) NOT NULL DEFAULT 0,
  `pos` set('Portero','Defensa','Mediocentro','Delantero') NOT NULL DEFAULT 'Mediocentro',
  `foto` text NOT NULL,
  `partidos` int(2) NOT NULL DEFAULT 0,
  `minutos` int(4) NOT NULL DEFAULT 0,
  `goles` int(2) NOT NULL,
  `asistencias` int(2) NOT NULL,
  `tarjetaAmarilla` int(2) NOT NULL,
  `tarjetaRoja` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `jugadores`
--

INSERT INTO `jugadores` (`id`, `id_equipo`, `nombre`, `apellidos`, `apodo`, `dorsal`, `pos`, `foto`, `partidos`, `minutos`, `goles`, `asistencias`, `tarjetaAmarilla`, `tarjetaRoja`) VALUES
(1, 1, 'rafa', 'rubio', 'rafi', 1, 'Portero', 'rafa.jpg', 4, 360, 0, 0, 1, 1),
(5, 1, 'javi', 'prada', 'javi', 2, 'Defensa', 'javi.jpg', 4, 360, 1, 2, 0, 1),
(6, 1, 'pakito', 'perez', 'elpaco', 3, 'Defensa', 'noimage.jpg', 4, 330, 2, 0, 1, 0),
(7, 1, 'Maria', 'Osuna', 'Mari', 4, 'Defensa', 'maria.jpg', 4, 300, 1, 1, 0, 1),
(8, 1, 'Pedro', 'Porras', 'Pedrito', 5, 'Defensa', 'noimage.jpg', 4, 360, 0, 1, 2, 1),
(9, 1, 'Mariano', 'Mejias', 'Marro', 6, 'Mediocentro', 'noimage.jpg', 4, 320, 0, 0, 1, 0),
(10, 1, 'Adrian', 'Garcia', 'Kiyotake', 7, 'Mediocentro', 'noimage.jpg', 4, 360, 1, 0, 1, 1),
(11, 1, 'Jaime', 'Amaya', 'Yimi', 8, 'Mediocentro', 'noimage.jpg', 4, 280, 0, 0, 0, 2),
(12, 1, 'Alejandro', 'Arias', 'Ale', 9, 'Delantero', 'noimage.jpg', 4, 300, 2, 3, 0, 1),
(13, 1, 'Benito', 'Camela', 'Beni', 10, 'Delantero', 'noimage.jpg', 4, 360, 0, 0, 0, 0),
(14, 1, 'Federico', 'Lorca', 'Fede', 11, 'Delantero', 'noimage.jpg', 4, 360, 0, 0, 0, 1),
(15, 1, 'Luis', 'Lopez', 'Lupo', 12, 'Mediocentro', 'noimage.jpg', 9, 270, 0, 0, 1, 0),
(16, 1, 'jesus', 'jesule', 'jesusito', 20, 'Mediocentro', 'antonio2.jpg', 1, 0, 0, 0, 0, 0),
(17, 6, 'ron', 'garcia', 'ron', 10, 'Delantero', 'ron.jpg', 0, 0, 0, 0, 0, 0),
(18, 6, 'pepito', 'palotes', 'pepe', 4, 'Defensa', 'noimage.jpg', 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `partidos`
--

CREATE TABLE `partidos` (
  `id` tinyint(4) NOT NULL,
  `id_equipo` tinyint(4) NOT NULL,
  `jornada` tinyint(2) NOT NULL,
  `localidad` tinyint(1) NOT NULL DEFAULT 1,
  `rival` varchar(20) CHARACTER SET utf8mb4 NOT NULL,
  `resultado` varchar(5) CHARACTER SET utf8mb4 NOT NULL DEFAULT '0-0',
  `informe` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`informe`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `partidos`
--

INSERT INTO `partidos` (`id`, `id_equipo`, `jornada`, `localidad`, `rival`, `resultado`, `informe`) VALUES
(10, 1, 2, 0, 'Osuna', '3-1', '{\"jugadores\":[{\"id\":\"1\",\"minutos\":\"90\",\"goles\":\"0\",\"asistencias\":\"0\",\"tarjetaAmarilla\":\"0\",\"tarjetaRoja\":\"0\"},{\"id\":\"5\",\"minutos\":\"90\",\"goles\":\"0\",\"asistencias\":\"0\",\"tarjetaAmarilla\":\"0\",\"tarjetaRoja\":\"0\"},{\"id\":\"6\",\"minutos\":\"90\",\"goles\":\"2\",\"asistencias\":\"0\",\"tarjetaAmarilla\":\"0\",\"tarjetaRoja\":\"0\"},{\"id\":\"7\",\"minutos\":\"90\",\"goles\":\"0\",\"asistencias\":\"1\",\"tarjetaAmarilla\":\"0\",\"tarjetaRoja\":\"0\"},{\"id\":\"8\",\"minutos\":\"90\",\"goles\":\"0\",\"asistencias\":\"0\",\"tarjetaAmarilla\":\"0\",\"tarjetaRoja\":\"0\"},{\"id\":\"9\",\"minutos\":\"50\",\"goles\":\"0\",\"asistencias\":\"0\",\"tarjetaAmarilla\":\"1\",\"tarjetaRoja\":\"0\"},{\"id\":\"10\",\"minutos\":\"90\",\"goles\":\"0\",\"asistencias\":\"0\",\"tarjetaAmarilla\":\"0\",\"tarjetaRoja\":\"1\"},{\"id\":\"11\",\"minutos\":\"40\",\"goles\":\"0\",\"asistencias\":\"0\",\"tarjetaAmarilla\":\"0\",\"tarjetaRoja\":\"0\"},{\"id\":\"12\",\"minutos\":\"90\",\"goles\":\"1\",\"asistencias\":\"2\",\"tarjetaAmarilla\":\"0\",\"tarjetaRoja\":\"1\"},{\"id\":\"13\",\"minutos\":\"90\",\"goles\":\"0\",\"asistencias\":\"0\",\"tarjetaAmarilla\":\"0\",\"tarjetaRoja\":\"0\"},{\"id\":\"14\",\"minutos\":\"90\",\"goles\":\"0\",\"asistencias\":\"0\",\"tarjetaAmarilla\":\"0\",\"tarjetaRoja\":\"0\"},{\"id\":\"15\",\"minutos\":\"90\",\"goles\":\"0\",\"asistencias\":\"0\",\"tarjetaAmarilla\":\"1\",\"tarjetaRoja\":\"0\"}]}'),
(11, 1, 6, 1, 'Granada', '5-0', '{\"jugadores\":[{\"id\":\"1\",\"minutos\":\"90\",\"goles\":\"0\",\"asistencias\":\"0\",\"tarjetaAmarilla\":\"0\",\"tarjetaRoja\":\"0\"},{\"id\":\"5\",\"minutos\":\"90\",\"goles\":\"0\",\"asistencias\":\"0\",\"tarjetaAmarilla\":\"0\",\"tarjetaRoja\":\"0\"},{\"id\":\"6\",\"minutos\":\"90\",\"goles\":\"0\",\"asistencias\":\"0\",\"tarjetaAmarilla\":\"1\",\"tarjetaRoja\":\"0\"},{\"id\":\"7\",\"minutos\":\"90\",\"goles\":\"0\",\"asistencias\":\"0\",\"tarjetaAmarilla\":\"0\",\"tarjetaRoja\":\"0\"},{\"id\":\"8\",\"minutos\":\"90\",\"goles\":\"0\",\"asistencias\":\"0\",\"tarjetaAmarilla\":\"0\",\"tarjetaRoja\":\"1\"},{\"id\":\"9\",\"minutos\":\"90\",\"goles\":\"0\",\"asistencias\":\"0\",\"tarjetaAmarilla\":\"0\",\"tarjetaRoja\":\"0\"},{\"id\":\"10\",\"minutos\":\"90\",\"goles\":\"0\",\"asistencias\":\"0\",\"tarjetaAmarilla\":\"0\",\"tarjetaRoja\":\"0\"},{\"id\":\"11\",\"minutos\":\"60\",\"goles\":\"0\",\"asistencias\":\"0\",\"tarjetaAmarilla\":\"0\",\"tarjetaRoja\":\"0\"},{\"id\":\"12\",\"minutos\":\"30\",\"goles\":\"0\",\"asistencias\":\"0\",\"tarjetaAmarilla\":\"0\",\"tarjetaRoja\":\"0\"},{\"id\":\"13\",\"minutos\":\"90\",\"goles\":\"0\",\"asistencias\":\"0\",\"tarjetaAmarilla\":\"0\",\"tarjetaRoja\":\"0\"},{\"id\":\"14\",\"minutos\":\"90\",\"goles\":\"0\",\"asistencias\":\"0\",\"tarjetaAmarilla\":\"0\",\"tarjetaRoja\":\"0\"},{\"id\":\"15\",\"minutos\":\"90\",\"goles\":\"0\",\"asistencias\":\"0\",\"tarjetaAmarilla\":\"0\",\"tarjetaRoja\":\"0\"},{\"id\":\"16\",\"minutos\":\"0\",\"goles\":\"0\",\"asistencias\":\"0\",\"tarjetaAmarilla\":\"0\",\"tarjetaRoja\":\"0\"}]}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` tinyint(4) NOT NULL,
  `usuario` varchar(15) NOT NULL,
  `nombre` varchar(15) NOT NULL,
  `apellidos` varchar(40) NOT NULL,
  `confirmado` tinyint(1) NOT NULL DEFAULT 0,
  `correo` varchar(20) NOT NULL,
  `tipo` set('admin','Entrenador','jugador') NOT NULL DEFAULT 'Entrenador',
  `contrasena` varchar(20) NOT NULL,
  `foto` text NOT NULL DEFAULT 'noimage.jpg'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `nombre`, `apellidos`, `confirmado`, `correo`, `tipo`, `contrasena`, `foto`) VALUES
(1, 'jesus', 'jesus', 'vazquez gessa', 1, 'jesus@eusa.es', 'admin', 'jesus', 'jesus.jpg'),
(2, 'nuria', 'nuria', 'fuentes', 1, 'nuria@eusa.es', 'Entrenador', 'nuria', 'nuria.jpg'),
(4, 'dani', 'dani', 'muniz', 1, 'dani@eusa.es', 'Entrenador', 'dani', 'dani.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `entrenadores`
--
ALTER TABLE `entrenadores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_equipo` (`id_equipo`),
  ADD UNIQUE KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `jugadores`
--
ALTER TABLE `jugadores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `partidos`
--
ALTER TABLE `partidos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario` (`usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `entrenadores`
--
ALTER TABLE `entrenadores`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `equipos`
--
ALTER TABLE `equipos`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `jugadores`
--
ALTER TABLE `jugadores`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `partidos`
--
ALTER TABLE `partidos`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
