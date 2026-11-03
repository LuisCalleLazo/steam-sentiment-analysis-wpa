import type { CommentDto } from "../types";

// ─────────────────────────────────────────────
// Hard-coded Steam reviews per game
// NOTE: When connecting to a real API, replace with GET /reviews?appid=<id>
//       The CommentDto shape intentionally mirrors what the Steam API returns
//       (author.playtime_forever → hoursGameplay, vote_score → sentiment)
// ─────────────────────────────────────────────

export const gameCommentsById: Record<string, CommentDto[]> = {

  // ══════════════════════════════════════════════════════════════════════════
  // JUEGOS ORIGINALES (5)
  // ══════════════════════════════════════════════════════════════════════════

  "the-forest": [
    { comment: "Perfecto para jugar en cooperativo y sobrevivir con amigos.", date: "2024-01-14", hoursGameplay: 18, sentiment: 86 },
    { comment: "La tensión es brutal, pero me encantó la progresión de la base.", date: "2024-02-18", hoursGameplay: 26, sentiment: 78 },
    { comment: "El terror es increíble, aunque hay algunos bugs frustrantes.", date: "2024-03-12", hoursGameplay: 14, sentiment: 58 },
    { comment: "Estoy obsesionado con la atmósfera y la exploración del mapa.", date: "2024-04-08", hoursGameplay: 31, sentiment: 92 },
    { comment: "La primera temporada estuvo muy bien, pero la dificultad repite mucho.", date: "2024-05-06", hoursGameplay: 21, sentiment: 61 },
    { comment: "La experiencia es muy buena, pero los enemigos a veces se sienten repetitivos.", date: "2024-06-20", hoursGameplay: 11, sentiment: 57 },
    { comment: "Me gusta demasiado la sensación de peligro constante.", date: "2024-07-11", hoursGameplay: 28, sentiment: 90 },
    { comment: "Sufrió varios fallos de rendimiento en mi PC.", date: "2024-08-03", hoursGameplay: 9, sentiment: -28 },
    { comment: "El juego sigue siendo excelente aunque necesita más variedad.", date: "2024-09-16", hoursGameplay: 33, sentiment: 72 },
    { comment: "La historia y la construcción de campamentos están muy bien.", date: "2024-10-09", hoursGameplay: 37, sentiment: 83 },
    { comment: "Los mutantes nocturnos me dan un miedo genuino, excelente diseño.", date: "2024-01-28", hoursGameplay: 22, sentiment: 88 },
    { comment: "El inventario es algo torpe al principio, pero te acostumbras.", date: "2024-02-05", hoursGameplay: 16, sentiment: 49 },
    { comment: "No pude terminar la historia principal, me aburrió después de 10h.", date: "2024-03-22", hoursGameplay: 10, sentiment: -15 },
    { comment: "La música ambiental es lo mejor del juego, muy inmersiva.", date: "2024-04-30", hoursGameplay: 29, sentiment: 80 },
    { comment: "Crasheó tres veces en una misma sesión, inaceptable.", date: "2024-05-19", hoursGameplay: 7, sentiment: -62 },
  ],

  "counter-strike-2": [
    { comment: "El balance competitivo está muy sólido y la sensación es buena.", date: "2024-01-19", hoursGameplay: 42, sentiment: 88 },
    { comment: "Los mapas siguen siendo icónicos y muy jugables.", date: "2024-02-26", hoursGameplay: 35, sentiment: 81 },
    { comment: "Hay mucho smurfing y partidas frustrantes en novatos.", date: "2024-03-09", hoursGameplay: 27, sentiment: -34 },
    { comment: "La experiencia en ranked merece la pena y se ve mejor en cada actualización.", date: "2024-04-14", hoursGameplay: 41, sentiment: 75 },
    { comment: "El rendimiento está bien, pero necesito más optimización en notebook.", date: "2024-05-17", hoursGameplay: 30, sentiment: 42 },
    { comment: "Muy divertido para jugar con amigos y mejorar la coordinación.", date: "2024-06-25", hoursGameplay: 50, sentiment: 89 },
    { comment: "La comunidad a veces es tóxica y reduce la experiencia.", date: "2024-07-12", hoursGameplay: 26, sentiment: -19 },
    { comment: "Las partidas rápidas siempre mantienen una tensión enorme.", date: "2024-08-19", hoursGameplay: 44, sentiment: 84 },
    { comment: "A pesar de los bugs del primer mes, ahora es muy estable.", date: "2024-09-08", hoursGameplay: 39, sentiment: 76 },
    { comment: "El juego sigue siendo una referencia en shooters competitivos.", date: "2024-10-11", hoursGameplay: 53, sentiment: 93 },
    { comment: "Los cheaters arruinan la mitad de las partidas de alto rango.", date: "2024-01-30", hoursGameplay: 60, sentiment: -71 },
    { comment: "Las skins nuevas son muy buenas, gran trabajo de diseño.", date: "2024-02-15", hoursGameplay: 38, sentiment: 67 },
    { comment: "El modo de práctica con bots mejoró mucho el aim training.", date: "2024-03-28", hoursGameplay: 20, sentiment: 74 },
    { comment: "Muy buen juego pero necesita un sistema anti-cheat más fuerte.", date: "2024-07-25", hoursGameplay: 47, sentiment: 35 },
    { comment: "Llevo 1000 horas y sigue siendo adictivo como el primer día.", date: "2024-10-30", hoursGameplay: 100, sentiment: 97 },
  ],

  "dota-2": [
    { comment: "Es un juego que ofrece una profundidad increíble con cada partida.", date: "2024-01-11", hoursGameplay: 48, sentiment: 94 },
    { comment: "A veces se siente pesado, pero la estrategia compensa todo.", date: "2024-02-19", hoursGameplay: 52, sentiment: 77 },
    { comment: "El balance de héroes no siempre es justo, pero me encanta.", date: "2024-03-28", hoursGameplay: 35, sentiment: 69 },
    { comment: "La cantidad de contenido es enorme y siempre se aprende algo nuevo.", date: "2024-04-22", hoursGameplay: 60, sentiment: 90 },
    { comment: "Jugar con amigos es espectacular, pero el matchmaker es lento.", date: "2024-05-13", hoursGameplay: 41, sentiment: 63 },
    { comment: "Cada decisión importa y eso hace que valga mucho la pena.", date: "2024-06-30", hoursGameplay: 55, sentiment: 91 },
    { comment: "Hay momentos de frustración por los errores de equipo.", date: "2024-07-18", hoursGameplay: 38, sentiment: -22 },
    { comment: "La curva de aprendizaje es dura, pero es muy gratificante.", date: "2024-08-27", hoursGameplay: 46, sentiment: 82 },
    { comment: "La comunidad es muy apasionada y la competitividad es enorme.", date: "2024-09-17", hoursGameplay: 57, sentiment: 85 },
    { comment: "Me encanta la variedad de roles y la complejidad del juego.", date: "2024-10-08", hoursGameplay: 49, sentiment: 92 },
    { comment: "El tutorial es horrible para nuevos jugadores, deberían mejorarlo.", date: "2024-01-25", hoursGameplay: 5, sentiment: -44 },
    { comment: "Las actualizaciones de Valve siempre traen algo interesante.", date: "2024-03-10", hoursGameplay: 62, sentiment: 78 },
    { comment: "El International es el evento de esports más emocionante del año.", date: "2024-06-05", hoursGameplay: 70, sentiment: 96 },
    { comment: "Perdí mi racha de 8 partidas seguidas, el emparejamiento es horrible.", date: "2024-08-12", hoursGameplay: 33, sentiment: -55 },
    { comment: "2000 horas y todavía aprendo cosas nuevas, increíble diseño.", date: "2024-10-20", hoursGameplay: 200, sentiment: 99 },
  ],

  "hollow-knight": [
    { comment: "Una obra de arte independiente. El mundo es increíblemente detallado.", date: "2024-01-08", hoursGameplay: 24, sentiment: 97 },
    { comment: "Los jefes son brutalmente difíciles pero muy satisfactorios al ganarles.", date: "2024-02-14", hoursGameplay: 30, sentiment: 88 },
    { comment: "La narrativa ambiental es magistral, todo se cuenta sin palabras.", date: "2024-03-03", hoursGameplay: 27, sentiment: 93 },
    { comment: "Morí más de 50 veces en Radiance, mi tolerancia al dolor aumentó.", date: "2024-04-18", hoursGameplay: 35, sentiment: 72 },
    { comment: "El mapa es confuso al principio pero la exploración es adictiva.", date: "2024-05-22", hoursGameplay: 20, sentiment: 65 },
    { comment: "La banda sonora me hizo llorar en el final, perfecta.", date: "2024-06-11", hoursGameplay: 28, sentiment: 95 },
    { comment: "Muy corto para el precio... espera, tiene 40 horas de contenido. Increíble.", date: "2024-07-04", hoursGameplay: 40, sentiment: 91 },
    { comment: "El combate es fluido y recompensa la paciencia y el aprendizaje.", date: "2024-08-16", hoursGameplay: 22, sentiment: 86 },
    { comment: "Algunos puzzles de plataformas son injustamente difíciles.", date: "2024-09-09", hoursGameplay: 18, sentiment: -12 },
    { comment: "No entendí nada del lore, pero me encantó el viaje.", date: "2024-10-01", hoursGameplay: 25, sentiment: 80 },
    { comment: "Se tardó en arrancar pero una vez que te engancha no puedes parar.", date: "2024-01-20", hoursGameplay: 32, sentiment: 84 },
    { comment: "Los bugs de guardado me hicieron perder 3 horas de progreso.", date: "2024-03-28", hoursGameplay: 15, sentiment: -48 },
    { comment: "Silksong no llega y yo aquí jugando el original por cuarta vez.", date: "2024-05-15", hoursGameplay: 45, sentiment: 70 },
    { comment: "Es el mejor juego indie que he jugado en mi vida, sin duda.", date: "2024-07-30", hoursGameplay: 38, sentiment: 99 },
    { comment: "El DLC Godmaster me destrozó emocionalmente de la mejor manera.", date: "2024-09-25", hoursGameplay: 50, sentiment: 94 },
  ],

  "cyberpunk-2077": [
    { comment: "El lanzamiento fue un desastre, pero después del parche 2.0 es increíble.", date: "2024-01-05", hoursGameplay: 60, sentiment: 78 },
    { comment: "La historia de V y Johnny Silverhand es una de las mejores en RPG.", date: "2024-02-10", hoursGameplay: 55, sentiment: 92 },
    { comment: "Night City es la ciudad más impresionante visualmente de cualquier videojuego.", date: "2024-03-15", hoursGameplay: 48, sentiment: 95 },
    { comment: "En consolas de vieja generación era injugable, en PC es espectacular.", date: "2024-04-02", hoursGameplay: 70, sentiment: 66 },
    { comment: "Las misiones secundarias tienen más profundidad que las principales de otros RPGs.", date: "2024-05-08", hoursGameplay: 65, sentiment: 90 },
    { comment: "La IA de la policía sigue siendo muy mala incluso tras los parches.", date: "2024-06-19", hoursGameplay: 40, sentiment: -29 },
    { comment: "Phantom Liberty es una expansión de 10/10, supera al juego base.", date: "2024-07-07", hoursGameplay: 80, sentiment: 96 },
    { comment: "El sistema de builds con la actualización 2.0 es el mejor del género.", date: "2024-08-23", hoursGameplay: 52, sentiment: 88 },
    { comment: "Tras 4 años sigo encontrando bugs gráficos ridículos.", date: "2024-09-14", hoursGameplay: 30, sentiment: -38 },
    { comment: "La banda sonora es absolutamente brutal, escucho los temas fuera del juego.", date: "2024-10-17", hoursGameplay: 57, sentiment: 91 },
    { comment: "CDPR rescató el juego pero el daño inicial a su reputación fue enorme.", date: "2024-01-28", hoursGameplay: 45, sentiment: 35 },
    { comment: "El modo foto debería ser estándar en todos los juegos modernos.", date: "2024-04-22", hoursGameplay: 36, sentiment: 73 },
    { comment: "Me prometieron GTA en el futuro y me dieron algo diferente. Igual me encanta.", date: "2024-06-30", hoursGameplay: 62, sentiment: 82 },
    { comment: "La optimización en tarjetas AMD todavía deja mucho que desear.", date: "2024-08-05", hoursGameplay: 25, sentiment: -44 },
    { comment: "Es el juego de la generación, aunque llegó tarde a donde debía estar.", date: "2024-10-28", hoursGameplay: 90, sentiment: 87 },
  ],

  // ══════════════════════════════════════════════════════════════════════════
  // 20 JUEGOS NUEVOS
  // ══════════════════════════════════════════════════════════════════════════

  // ── ELDEN RING ─────────────────────────────
  "elden-ring": [
    { comment: "El mejor juego que he jugado en años. Fromsoft lo hizo de nuevo.", date: "2024-01-10", hoursGameplay: 85, sentiment: 98 },
    { comment: "Morgott me tuvo 2 días atascado. Qué jefe tan bien diseñado.", date: "2024-02-14", hoursGameplay: 72, sentiment: 89 },
    { comment: "El mundo abierto es enorme pero algo vacío entre los puntos de interés.", date: "2024-03-05", hoursGameplay: 60, sentiment: 52 },
    { comment: "La colaboración con George R.R. Martin se nota en cada fragmento del lore.", date: "2024-04-17", hoursGameplay: 100, sentiment: 94 },
    { comment: "Optimización pésima en PC, muchos stutters incluso con hardware potente.", date: "2024-05-21", hoursGameplay: 40, sentiment: -61 },
    { comment: "Malenia es el mejor y peor jefe de la historia de los videojuegos.", date: "2024-06-08", hoursGameplay: 110, sentiment: 76 },
    { comment: "El sistema de invocaciones hizo el juego demasiado fácil para mi gusto.", date: "2024-07-15", hoursGameplay: 65, sentiment: 30 },
    { comment: "Después de 3 intentos fallidos, finalmente terminé el Árbol del Mundo.", date: "2024-08-02", hoursGameplay: 95, sentiment: 91 },
    { comment: "Shadow of the Erdtree es la mejor expansión que se ha hecho en la industria.", date: "2024-09-19", hoursGameplay: 120, sentiment: 97 },
    { comment: "El cooperativo con amigos convirtió la experiencia en algo mágico.", date: "2024-10-14", hoursGameplay: 80, sentiment: 85 },
    { comment: "Los ataques de latencia en PvP son intolerables, el netcode es pésimo.", date: "2024-01-29", hoursGameplay: 55, sentiment: -47 },
    { comment: "La variedad de armas y builds es impresionante, 200 horas y no he visto todo.", date: "2024-03-22", hoursGameplay: 200, sentiment: 96 },
  ],

  // ── STARDEW VALLEY ─────────────────────────
  "stardew-valley": [
    { comment: "Un juego hecho por una sola persona que supera a estudios enteros. Increíble.", date: "2024-01-07", hoursGameplay: 110, sentiment: 99 },
    { comment: "La progresión de la granja es adictiva, no pude parar de jugar.", date: "2024-02-19", hoursGameplay: 85, sentiment: 95 },
    { comment: "El final del año 3 en mi granja me hizo sentir orgulloso como nada.", date: "2024-03-10", hoursGameplay: 120, sentiment: 93 },
    { comment: "La actualización 1.6 agregó contenido que ya era perfecto. Aún mejor.", date: "2024-04-25", hoursGameplay: 150, sentiment: 97 },
    { comment: "El minado se siente algo monótono comparado con la granja.", date: "2024-05-14", hoursGameplay: 60, sentiment: 44 },
    { comment: "Casarme con Harvey fue la mejor decisión virtual de mi vida.", date: "2024-06-03", hoursGameplay: 90, sentiment: 88 },
    { comment: "El modo cooperativo con mi pareja nos une más que cualquier actividad real.", date: "2024-07-22", hoursGameplay: 140, sentiment: 96 },
    { comment: "El final secreto me hizo llorar. Un juego tan pequeño con tanto corazón.", date: "2024-08-11", hoursGameplay: 200, sentiment: 99 },
    { comment: "La música es tan relajante que la pongo cuando trabajo.", date: "2024-09-05", hoursGameplay: 75, sentiment: 91 },
    { comment: "Arranqué el juego a las 10pm y cuando miré eran las 4am.", date: "2024-10-18", hoursGameplay: 100, sentiment: 87 },
    { comment: "No es para todos, si no te gustan los simuladores te aburrirás rápido.", date: "2024-02-08", hoursGameplay: 12, sentiment: 20 },
    { comment: "ConcernedApe sigue actualizando el juego gratis 8 años después. Respeto total.", date: "2024-07-30", hoursGameplay: 180, sentiment: 98 },
  ],

  // ── AMONG US ───────────────────────────────
  "among-us": [
    { comment: "Divertidísimo con 10 amigos en Discord, nunca paran las risas.", date: "2024-01-16", hoursGameplay: 32, sentiment: 90 },
    { comment: "El hype ya pasó pero sigue siendo muy entretenido con la gente correcta.", date: "2024-02-23", hoursGameplay: 25, sentiment: 68 },
    { comment: "Los servidores públicos están llenos de cheaters que revelan quién es el impostor.", date: "2024-03-14", hoursGameplay: 18, sentiment: -52 },
    { comment: "Mi amigo es tan buen actor que nunca lo votamos aunque sea el impostor.", date: "2024-04-09", hoursGameplay: 40, sentiment: 84 },
    { comment: "Las nuevas misiones son creativas y varían bien la mecánica básica.", date: "2024-05-28", hoursGameplay: 22, sentiment: 73 },
    { comment: "El juego envejeció bien, pero necesita más mapas para mantenerse fresco.", date: "2024-06-17", hoursGameplay: 35, sentiment: 55 },
    { comment: "Perfecto para partidas cortas de 15 minutos, ideal para pausas.", date: "2024-07-06", hoursGameplay: 28, sentiment: 79 },
    { comment: "Mi familia entera de 60+ años lo juega y se ríen como niños.", date: "2024-08-14", hoursGameplay: 15, sentiment: 93 },
    { comment: "Los niños de voz en el chat hacen imposible la deducción seria.", date: "2024-09-21", hoursGameplay: 10, sentiment: -31 },
    { comment: "Jugué en el trabajo durante una reunión aburrida. No me arrepiento.", date: "2024-10-05", hoursGameplay: 45, sentiment: 82 },
  ],

  // ── LEFT 4 DEAD 2 ──────────────────────────
  "left-4-dead-2": [
    { comment: "15 años después sigo jugándolo. El mejor cooperativo de zombis de la historia.", date: "2024-01-13", hoursGameplay: 350, sentiment: 99 },
    { comment: "El Director de IA sigue siendo un concepto brillante sin igual en el género.", date: "2024-02-07", hoursGameplay: 280, sentiment: 97 },
    { comment: "Los mods de la comunidad multiplican el juego por 100, contenido infinito.", date: "2024-03-19", hoursGameplay: 400, sentiment: 95 },
    { comment: "El modo versus es brutal pero adictivo, ser un infectado especial es genial.", date: "2024-04-28", hoursGameplay: 190, sentiment: 87 },
    { comment: "Valve abandonó el juego pero la comunidad lo mantiene vivo y activo.", date: "2024-05-10", hoursGameplay: 220, sentiment: 72 },
    { comment: "Screaming en el micro con mis amigos a las 3am, experiencia única.", date: "2024-06-22", hoursGameplay: 160, sentiment: 91 },
    { comment: "Los jugadores grieferos en servidores públicos arruinan la experiencia.", date: "2024-07-09", hoursGameplay: 75, sentiment: -28 },
    { comment: "El tanque es el enemigo más satisfactorio de matar en cooperativo.", date: "2024-08-26", hoursGameplay: 310, sentiment: 88 },
    { comment: "Sin duda uno de los juegos más rejugables de la historia de Steam.", date: "2024-09-13", hoursGameplay: 500, sentiment: 98 },
    { comment: "Las campañas de la comunidad son tan buenas como las originales.", date: "2024-10-24", hoursGameplay: 260, sentiment: 90 },
  ],

  // ── TEAM FORTRESS 2 ────────────────────────
  "team-fortress-2": [
    { comment: "17 años y sigue siendo el shooter más divertido que existe. Obra maestra.", date: "2024-01-04", hoursGameplay: 600, sentiment: 98 },
    { comment: "El arte estilizado y el humor son únicos, envejecen perfectamente.", date: "2024-02-12", hoursGameplay: 420, sentiment: 94 },
    { comment: "Los bots de spam han hecho los servidores públicos injugables.", date: "2024-03-08", hoursGameplay: 300, sentiment: -68 },
    { comment: "Valve lleva 7 años sin actualizar el juego de forma seria.", date: "2024-04-20", hoursGameplay: 500, sentiment: -45 },
    { comment: "El sistema de economía de skins es adictivo pero puede volverse caro.", date: "2024-05-16", hoursGameplay: 250, sentiment: 38 },
    { comment: "Jugar de Spy y engañar a un equipo entero es la mayor satisfacción.", date: "2024-06-27", hoursGameplay: 380, sentiment: 95 },
    { comment: "La comunidad de servidores privados salvó el juego de la muerte.", date: "2024-07-14", hoursGameplay: 340, sentiment: 80 },
    { comment: "El Medic ÜberCharge bien coordinado puede cambiar partidas enteras.", date: "2024-08-08", hoursGameplay: 290, sentiment: 89 },
    { comment: "Gratis y con cientos de horas de contenido legítimo. Imprescindible.", date: "2024-09-30", hoursGameplay: 450, sentiment: 91 },
    { comment: "Ojalá Valve sacara TF3 aunque sea, el motor original ya muestra su edad.", date: "2024-10-07", hoursGameplay: 700, sentiment: 55 },
  ],

  // ── PORTAL 2 ───────────────────────────────
  "portal-2": [
    { comment: "El mejor juego de puzzles de la historia, y probablemente el mejor de Valve.", date: "2024-01-22", hoursGameplay: 12, sentiment: 99 },
    { comment: "GlaDOS es el mejor villano-antagonista de los videojuegos, sin debate.", date: "2024-02-16", hoursGameplay: 15, sentiment: 97 },
    { comment: "El cooperativo con mi pareja nos hizo reírnos y pelearnos a partes iguales.", date: "2024-03-25", hoursGameplay: 10, sentiment: 93 },
    { comment: "Demasiado corto para el precio, aunque la calidad es impecable.", date: "2024-04-11", hoursGameplay: 9, sentiment: 58 },
    { comment: "La escritura tiene más corazón y humor que la mayoría de películas.", date: "2024-05-30", hoursGameplay: 14, sentiment: 96 },
    { comment: "Los mapas de la comunidad añaden cientos de horas de contenido gratuito.", date: "2024-06-15", hoursGameplay: 40, sentiment: 88 },
    { comment: "Cada puzzle resuelto da una satisfacción enorme por la elegancia del diseño.", date: "2024-07-28", hoursGameplay: 13, sentiment: 95 },
    { comment: "Wheatley es tan idiota que resulta adorable.", date: "2024-08-20", hoursGameplay: 11, sentiment: 91 },
    { comment: "La canción final es perfecta. Valve sabe cómo cerrar experiencias.", date: "2024-09-03", hoursGameplay: 16, sentiment: 94 },
    { comment: "Jugué a ciegas sin guías y fue la mejor decisión, las soluciones te llegan.", date: "2024-10-22", hoursGameplay: 18, sentiment: 90 },
  ],

  // ── GTA V ──────────────────────────────────
  "gta-v": [
    { comment: "La historia de los tres protagonistas es la mejor del género de mundo abierto.", date: "2024-01-18", hoursGameplay: 65, sentiment: 92 },
    { comment: "GTA Online se ha convertido en un segundo trabajo de tanto contenido.", date: "2024-02-24", hoursGameplay: 300, sentiment: 75 },
    { comment: "Los microtransacciones en Online son descaradas y arruinan la progresión.", date: "2024-03-16", hoursGameplay: 120, sentiment: -55 },
    { comment: "11 años y Rockstar sigue sacando contenido para Online. Impresionante.", date: "2024-04-05", hoursGameplay: 200, sentiment: 70 },
    { comment: "El modo rapina con amigos es pura adrenalina y diversión.", date: "2024-05-24", hoursGameplay: 180, sentiment: 88 },
    { comment: "Los gráficos en PC aún aguantan perfectamente, gran port.", date: "2024-06-10", hoursGameplay: 85, sentiment: 79 },
    { comment: "La compra de Shark Cards para el dinero online es un robo descarado.", date: "2024-07-19", hoursGameplay: 90, sentiment: -62 },
    { comment: "Los mods de PC transforman el juego en algo completamente diferente.", date: "2024-08-06", hoursGameplay: 150, sentiment: 83 },
    { comment: "Las misiones de historia son variadas y tienen momentos cinematográficos.", date: "2024-09-28", hoursGameplay: 70, sentiment: 86 },
    { comment: "GTA VI tardará pero este sigue siendo el estándar del género.", date: "2024-10-16", hoursGameplay: 250, sentiment: 68 },
    { comment: "Los grieferos en aviones en modo libre arruinan todo el Online.", date: "2024-02-28", hoursGameplay: 100, sentiment: -73 },
    { comment: "Michael, Trevor y Franklin son personajes que recordaré siempre.", date: "2024-07-03", hoursGameplay: 75, sentiment: 95 },
  ],

  // ── RUST ───────────────────────────────────
  "rust": [
    { comment: "El juego más brutal y estresante que he jugado. No puedo parar.", date: "2024-01-26", hoursGameplay: 150, sentiment: 80 },
    { comment: "Me wipearon la base en 20 minutos mientras dormía. Desinstalé.", date: "2024-02-20", hoursGameplay: 45, sentiment: -78 },
    { comment: "La sensación de construir una base fuerte y resistir un raid es única.", date: "2024-03-29", hoursGameplay: 200, sentiment: 88 },
    { comment: "El PvP requiere cientos de horas para competir con veteranos.", date: "2024-04-16", hoursGameplay: 80, sentiment: 35 },
    { comment: "Jugarlo solo es masoquismo puro. Con un grupo de amigos es épico.", date: "2024-05-07", hoursGameplay: 120, sentiment: 74 },
    { comment: "Los hackers son un problema constante que destroza la experiencia.", date: "2024-06-14", hoursGameplay: 60, sentiment: -66 },
    { comment: "El progression loop de piedra a metal a HQM es muy satisfactorio.", date: "2024-07-23", hoursGameplay: 170, sentiment: 82 },
    { comment: "Perdí todo en el wipe mensual. Ya estoy construyendo de nuevo.", date: "2024-08-30", hoursGameplay: 250, sentiment: 65 },
    { comment: "Los servidores con mods de roleplay cambian el juego completamente.", date: "2024-09-12", hoursGameplay: 100, sentiment: 79 },
    { comment: "El sistema de crafteo y tecnología es uno de los más completos del género.", date: "2024-10-26", hoursGameplay: 190, sentiment: 87 },
  ],

  // ── ARK ────────────────────────────────────
  "ark": [
    { comment: "Domesticar un T-Rex por primera vez es una de las mejores sensaciones en gaming.", date: "2024-01-31", hoursGameplay: 180, sentiment: 91 },
    { comment: "La optimización es terrible incluso en PCs de alta gama.", date: "2024-02-08", hoursGameplay: 90, sentiment: -70 },
    { comment: "Con un servidor privado y amigos, es la mejor experiencia cooperativa.", date: "2024-03-18", hoursGameplay: 250, sentiment: 85 },
    { comment: "El contenido de los DLC es increíble pero el precio total es abusivo.", date: "2024-04-27", hoursGameplay: 150, sentiment: 40 },
    { comment: "Los meshs y exploits de los alpha tribes hacen el PvP injusto.", date: "2024-05-09", hoursGameplay: 100, sentiment: -48 },
    { comment: "El proceso de domar un Quetzal solo es una hazaña épica.", date: "2024-06-21", hoursGameplay: 220, sentiment: 83 },
    { comment: "El servidor oficial en el que jugaba fue borrado sin aviso. Pésimo soporte.", date: "2024-07-16", hoursGameplay: 300, sentiment: -82 },
    { comment: "La variedad de biomas y dinosaurios en los mapas DLC es asombrosa.", date: "2024-08-23", hoursGameplay: 200, sentiment: 79 },
    { comment: "ARK 2 no termina de llegar y este sigue siendo la referencia del género.", date: "2024-09-07", hoursGameplay: 400, sentiment: 61 },
    { comment: "Una tribu bien organizada jugando al mismo tiempo es indescriptible.", date: "2024-10-19", hoursGameplay: 280, sentiment: 90 },
  ],

  // ── TERRARIA ───────────────────────────────
  "terraria": [
    { comment: "400 horas y todavía descubro crafteos que no sabía que existían.", date: "2024-01-09", hoursGameplay: 400, sentiment: 98 },
    { comment: "El contenido post-Luna es uno de los mejores endgame de cualquier juego.", date: "2024-02-17", hoursGameplay: 280, sentiment: 96 },
    { comment: "La actualización Journey's End fue el cierre perfecto para un juego perfecto.", date: "2024-03-07", hoursGameplay: 350, sentiment: 99 },
    { comment: "Matar al Wall of Flesh por primera vez transforma el juego completamente.", date: "2024-04-14", hoursGameplay: 120, sentiment: 94 },
    { comment: "En modos difíciles se hace injusto y frustrante rápidamente.", date: "2024-05-23", hoursGameplay: 80, sentiment: 28 },
    { comment: "Construir una ciudad de NPCs con arquitectura personalizada es muy satisfactorio.", date: "2024-06-04", hoursGameplay: 500, sentiment: 90 },
    { comment: "El cooperativo de 4 jugadores hace los jefes más manejables y emocionantes.", date: "2024-07-17", hoursGameplay: 160, sentiment: 93 },
    { comment: "La cantidad de contenido por $10 es ridícula, el mejor precio/valor del catálogo.", date: "2024-08-29", hoursGameplay: 320, sentiment: 97 },
    { comment: "Calamity Mod transformó el juego en algo completamente nuevo.", date: "2024-09-22", hoursGameplay: 450, sentiment: 95 },
    { comment: "La curva de dificultad es empinada pero siempre justa y bien señalizada.", date: "2024-10-11", hoursGameplay: 200, sentiment: 88 },
  ],

  // ── GARRY'S MOD ────────────────────────────
  "garrys-mod": [
    { comment: "El sandbox más creativo y delirante que existe. Horas infinitas garantizadas.", date: "2024-01-21", hoursGameplay: 800, sentiment: 95 },
    { comment: "Prop Hunt con amigos sigue siendo la experiencia más divertida en Steam.", date: "2024-02-13", hoursGameplay: 400, sentiment: 93 },
    { comment: "DarkRP es un juego completamente diferente dentro del mismo juego. Genial.", date: "2024-03-26", hoursGameplay: 600, sentiment: 88 },
    { comment: "Los addons de la Workshop tienen más calidad que muchos juegos pagados.", date: "2024-04-08", hoursGameplay: 300, sentiment: 90 },
    { comment: "El juego base sin mods es un lienzo en blanco, los mods lo completan.", date: "2024-05-19", hoursGameplay: 150, sentiment: 70 },
    { comment: "Garry actualizó el motor y rompió la mitad de los addons clásicos.", date: "2024-06-26", hoursGameplay: 500, sentiment: -38 },
    { comment: "Las machinimas y cortometrajes hechos en GMod son arte genuino.", date: "2024-07-08", hoursGameplay: 450, sentiment: 86 },
    { comment: "TTT con 16 amigos en un servidor privado es puro caos maravilloso.", date: "2024-08-15", hoursGameplay: 350, sentiment: 94 },
    { comment: "Los trolls en servidores públicos hacen imposible disfrutarlo sin amigos.", date: "2024-09-04", hoursGameplay: 200, sentiment: -22 },
    { comment: "Llevo 1000 horas y sigo encontrando mods nuevos que no conocía.", date: "2024-10-29", hoursGameplay: 1000, sentiment: 91 },
  ],

  // ── WARFRAME ───────────────────────────────
  "warframe": [
    { comment: "El movimiento es el más fluido de cualquier shooter en tercera persona.", date: "2024-01-03", hoursGameplay: 200, sentiment: 94 },
    { comment: "La comunidad más generosa de Steam, siempre dispuestos a ayudar.", date: "2024-02-22", hoursGameplay: 150, sentiment: 90 },
    { comment: "La curva de aprendizaje inicial es una pared de hormigón.", date: "2024-03-11", hoursGameplay: 30, sentiment: -22 },
    { comment: "El contenido Duviri Paradox redefinió lo que puede hacer un free-to-play.", date: "2024-04-23", hoursGameplay: 300, sentiment: 88 },
    { comment: "El grind eterno puede volverse agotador sin inversión de dinero real.", date: "2024-05-05", hoursGameplay: 180, sentiment: 35 },
    { comment: "Construir mi primer warframe desde cero fue increíblemente satisfactorio.", date: "2024-06-18", hoursGameplay: 120, sentiment: 85 },
    { comment: "Digital Extremes escucha a su comunidad más que cualquier estudio grande.", date: "2024-07-31", hoursGameplay: 250, sentiment: 91 },
    { comment: "Los Railjack con amigos son la fantasía espacial que siempre quise.", date: "2024-08-12", hoursGameplay: 220, sentiment: 87 },
    { comment: "El trading entre jugadores crea una economía real muy interesante.", date: "2024-09-25", hoursGameplay: 400, sentiment: 82 },
    { comment: "Actualización tras actualización, el juego solo mejora en cantidad y calidad.", date: "2024-10-10", hoursGameplay: 350, sentiment: 93 },
  ],

  // ── PATH OF EXILE ──────────────────────────
  "path-of-exile": [
    { comment: "El árbol de habilidades pasivas es el más profundo y complejo del género.", date: "2024-01-15", hoursGameplay: 300, sentiment: 93 },
    { comment: "La liga de temporada siempre trae mecánicas nuevas que rejuvenecen el juego.", date: "2024-02-11", hoursGameplay: 250, sentiment: 89 },
    { comment: "Para un nuevo jugador es incomprensible sin guías en YouTube.", date: "2024-03-20", hoursGameplay: 40, sentiment: -15 },
    { comment: "El endgame de Mapping tiene una profundidad que ningún ARPG rival iguala.", date: "2024-04-03", hoursGameplay: 500, sentiment: 96 },
    { comment: "Las ligas con mecánicas complicadas pueden hacer la experiencia caótica.", date: "2024-05-27", hoursGameplay: 180, sentiment: 40 },
    { comment: "La build de Explosive Arrow Ballista me permitió completar todo el atlas.", date: "2024-06-13", hoursGameplay: 350, sentiment: 91 },
    { comment: "Los crashes frecuentes en ligas nuevas son un problema histórico sin resolver.", date: "2024-07-24", hoursGameplay: 200, sentiment: -53 },
    { comment: "La economía sin dinero real es brillante y muy bien pensada.", date: "2024-08-07", hoursGameplay: 280, sentiment: 87 },
    { comment: "GGG es el estudio más comprometido con su comunidad en el género.", date: "2024-09-18", hoursGameplay: 420, sentiment: 92 },
    { comment: "Cada nueva liga es un evento que une a la comunidad por semanas.", date: "2024-10-03", hoursGameplay: 600, sentiment: 94 },
  ],

  // ── DEAD BY DAYLIGHT ───────────────────────
  "dead-by-daylight": [
    { comment: "La tensión de ser perseguido en la oscuridad es incomparable.", date: "2024-01-27", hoursGameplay: 120, sentiment: 85 },
    { comment: "El balance entre asesinos y supervivientes nunca está bien ajustado.", date: "2024-02-06", hoursGameplay: 90, sentiment: -25 },
    { comment: "Los crossovers con Freddy, Michael Myers y Nemesis son absolutamente geniales.", date: "2024-03-15", hoursGameplay: 150, sentiment: 88 },
    { comment: "El ranking de rangos es un desastre que castiga jugar correctamente.", date: "2024-04-29", hoursGameplay: 80, sentiment: -41 },
    { comment: "Jugar de asesino por primera vez fue abrumador pero adictivo.", date: "2024-05-12", hoursGameplay: 60, sentiment: 72 },
    { comment: "La comunidad es toxica en chats postgame de ambos lados.", date: "2024-06-09", hoursGameplay: 100, sentiment: -33 },
    { comment: "Los mapas originales del juego tienen mucha más profundidad que los licenciados.", date: "2024-07-20", hoursGameplay: 180, sentiment: 79 },
    { comment: "El sistema de perks permite builds muy creativas y sorprendentes.", date: "2024-08-04", hoursGameplay: 200, sentiment: 86 },
    { comment: "Con amigos supervivientes coordinados, el juego se vuelve táctico y emocionante.", date: "2024-09-26", hoursGameplay: 140, sentiment: 90 },
    { comment: "Los DLC de personajes licenciados son demasiado caros para lo que ofrecen.", date: "2024-10-21", hoursGameplay: 110, sentiment: -48 },
  ],

  // ── HADES ──────────────────────────────────
  "hades": [
    { comment: "El primer roguelike que me hizo querer morir para continuar la historia.", date: "2024-01-06", hoursGameplay: 60, sentiment: 98 },
    { comment: "La narrativa se desarrolla orgánicamente en cada run fallida. Brillante.", date: "2024-02-25", hoursGameplay: 80, sentiment: 97 },
    { comment: "Supergiant demostró que se puede contar una historia épica en un roguelike.", date: "2024-03-04", hoursGameplay: 55, sentiment: 96 },
    { comment: "El sistema de armas y las bendiciones de los dioses ofrecen variedad infinita.", date: "2024-04-18", hoursGameplay: 70, sentiment: 94 },
    { comment: "Demasiado fácil en algunos modos de asistencia, pierde algo de encanto.", date: "2024-05-31", hoursGameplay: 45, sentiment: 48 },
    { comment: "Zagreus es uno de los mejores protagonistas del videojuego moderno.", date: "2024-06-16", hoursGameplay: 90, sentiment: 95 },
    { comment: "El final verdadero requiere muchas corridas pero la revelación vale todo.", date: "2024-07-05", hoursGameplay: 110, sentiment: 91 },
    { comment: "La banda sonora de Darren Korb es perfecta para cada zona del inframundo.", date: "2024-08-22", hoursGameplay: 65, sentiment: 93 },
    { comment: "El speedrunning de este juego es fascinante de ver en comunidad.", date: "2024-09-16", hoursGameplay: 130, sentiment: 86 },
    { comment: "Hades II ya está en acceso anticipado y también es impresionante.", date: "2024-10-31", hoursGameplay: 100, sentiment: 92 },
  ],

  // ── SEKIRO ─────────────────────────────────
  "sekiro": [
    { comment: "El sistema de desvíos y postura es el más satisfactorio de cualquier juego.", date: "2024-01-11", hoursGameplay: 50, sentiment: 97 },
    { comment: "Genichiro en Ashina Castle es el jefe tutorial que filtra a los que no son merecedores.", date: "2024-02-21", hoursGameplay: 45, sentiment: 85 },
    { comment: "La ambientación del Japón feudal es absolutamente hermosa.", date: "2024-03-30", hoursGameplay: 55, sentiment: 94 },
    { comment: "Sin opción de dificultad, excluye a jugadores que podrían disfrutarlo.", date: "2024-04-12", hoursGameplay: 20, sentiment: -18 },
    { comment: "Vencer a Isshin, el Espadachín del Clan Ashina fue el pico de mi vida.", date: "2024-05-20", hoursGameplay: 80, sentiment: 99 },
    { comment: "La historia es más fácil de seguir que Dark Souls pero igualmente profunda.", date: "2024-06-07", hoursGameplay: 62, sentiment: 88 },
    { comment: "El prostético ninja ofrece posibilidades de juego que otros juegos envidiarían.", date: "2024-07-26", hoursGameplay: 58, sentiment: 92 },
    { comment: "Morí 87 veces en Demon of Hatred. Mis dedos tienen trauma.", date: "2024-08-18", hoursGameplay: 70, sentiment: 61 },
    { comment: "La partitura musical de Yuka Kitamura es emotiva y perfectamente situada.", date: "2024-09-01", hoursGameplay: 53, sentiment: 91 },
    { comment: "El mejor juego de From Software en cuanto a sensación de combate puro.", date: "2024-10-27", hoursGameplay: 90, sentiment: 96 },
  ],

  // ── RED DEAD REDEMPTION 2 ──────────────────
  "red-dead-2": [
    { comment: "Arthur Morgan es el mejor protagonista de un videojuego en la historia.", date: "2024-01-02", hoursGameplay: 90, sentiment: 99 },
    { comment: "El mundo vivo del Lejano Oeste es un logro técnico y artístico sin precedentes.", date: "2024-02-09", hoursGameplay: 75, sentiment: 97 },
    { comment: "La historia te destrozará emocionalmente. Un juego para sentir, no solo jugar.", date: "2024-03-23", hoursGameplay: 85, sentiment: 98 },
    { comment: "El port de PC tuvo un lanzamiento terrible con crashes constantes.", date: "2024-04-06", hoursGameplay: 30, sentiment: -62 },
    { comment: "Los detalles de fauna y flora son increíbles, cada zona se siente única.", date: "2024-05-18", hoursGameplay: 100, sentiment: 95 },
    { comment: "El control del caballo siente raro al principio, pero luego es muy fluido.", date: "2024-06-28", hoursGameplay: 60, sentiment: 65 },
    { comment: "Red Dead Online fue abandonado demasiado pronto por Rockstar. Pena enorme.", date: "2024-07-11", hoursGameplay: 110, sentiment: -38 },
    { comment: "Las misiones de los compañeros del campamento son más emotivas que muchas historias.", date: "2024-08-25", hoursGameplay: 80, sentiment: 93 },
    { comment: "El capítulo 6 es la mejor escritura en la historia de Rockstar Games.", date: "2024-09-08", hoursGameplay: 95, sentiment: 99 },
    { comment: "La caza y pesca son tan detalladas que podrían ser un juego aparte.", date: "2024-10-13", hoursGameplay: 120, sentiment: 86 },
    { comment: "Tardé 3 intentos en el lanzador de Rockstar para que abriera. Pésimo.", date: "2024-03-02", hoursGameplay: 5, sentiment: -47 },
    { comment: "El epilogo de John Marston cierra perfectamente la saga completa.", date: "2024-07-29", hoursGameplay: 130, sentiment: 97 },
  ],

  // ── THE WITCHER 3 ──────────────────────────
  "witcher-3": [
    { comment: "La mejor misión secundaria de la historia del gaming es la de los Barones de Sangre.", date: "2024-01-19", hoursGameplay: 120, sentiment: 99 },
    { comment: "Geralt es el protagonista más carismático y complejo del RPG occidental.", date: "2024-02-27", hoursGameplay: 95, sentiment: 96 },
    { comment: "La expansión Hearts of Stone es mejor que muchos juegos completos.", date: "2024-03-21", hoursGameplay: 140, sentiment: 97 },
    { comment: "La actualización Next Gen arruinó muchos mods y causó bugs nuevos.", date: "2024-04-01", hoursGameplay: 80, sentiment: -44 },
    { comment: "El mundo de juego tiene una coherencia y profundidad sin igual.", date: "2024-05-25", hoursGameplay: 150, sentiment: 95 },
    { comment: "El combate original se siente torpe, aunque mejoró con parches.", date: "2024-06-06", hoursGameplay: 70, sentiment: 42 },
    { comment: "Blood and Wine tiene la mejor ciudad de RPG que he visto jamás: Toussaint.", date: "2024-07-13", hoursGameplay: 160, sentiment: 98 },
    { comment: "Gwent es tan bueno que casi descuidé la historia principal para jugarlo.", date: "2024-08-21", hoursGameplay: 110, sentiment: 87 },
    { comment: "Las decisiones morales tienen peso real con consecuencias tardías impredecibles.", date: "2024-09-15", hoursGameplay: 130, sentiment: 94 },
    { comment: "CD Projekt Red demostró con este juego cómo se hace un RPG de mundo abierto.", date: "2024-10-06", hoursGameplay: 180, sentiment: 98 },
    { comment: "200 horas después, aún tengo misiones sin ver. La densidad de contenido es brutal.", date: "2024-06-24", hoursGameplay: 200, sentiment: 96 },
    { comment: "Los bugs de IA de los NPC son chistosos pero rompen la inmersión.", date: "2024-09-29", hoursGameplay: 90, sentiment: 38 },
  ],

  // ── VALHEIM ────────────────────────────────
  "valheim": [
    { comment: "El mejor juego de supervivencia de 2021 hecho por solo 5 personas.", date: "2024-01-24", hoursGameplay: 130, sentiment: 95 },
    { comment: "Construir un salón vikingo que da miedo es la mayor satisfacción.", date: "2024-02-03", hoursGameplay: 80, sentiment: 90 },
    { comment: "El bioma de la Niebla es el diseño más frustrante del juego.", date: "2024-03-13", hoursGameplay: 100, sentiment: -18 },
    { comment: "Matar a Eikthyr con mis amigos por primera vez fue épico e icónico.", date: "2024-04-21", hoursGameplay: 60, sentiment: 93 },
    { comment: "Las actualizaciones tardan demasiado para la comunidad activa.", date: "2024-05-02", hoursGameplay: 150, sentiment: 40 },
    { comment: "El sistema de navegación y los barcos son únicos en el género supervivencia.", date: "2024-06-29", hoursGameplay: 110, sentiment: 88 },
    { comment: "La estética nórdica del arte es preciosa, muy coherente con el tema.", date: "2024-07-18", hoursGameplay: 90, sentiment: 86 },
    { comment: "Con un servidor dedicado y 8 amigos, es la mejor experiencia cooperativa.", date: "2024-08-10", hoursGameplay: 170, sentiment: 94 },
    { comment: "El combate cuerpo a cuerpo es satisfactorio, especialmente el golpe de escudo.", date: "2024-09-23", hoursGameplay: 120, sentiment: 83 },
    { comment: "Iron Gate merece todo el éxito, el juego tiene alma que los AAA perdieron.", date: "2024-10-15", hoursGameplay: 200, sentiment: 92 },
  ],

  // ── NO MAN'S SKY ───────────────────────────
  "no-mans-sky": [
    { comment: "La redención más épica de la industria. De bomba total a masterpiece.", date: "2024-01-01", hoursGameplay: 100, sentiment: 96 },
    { comment: "Hello Games siguió actualizando GRATIS durante 8 años. Respeto sin límite.", date: "2024-02-04", hoursGameplay: 120, sentiment: 98 },
    { comment: "La exploración de planetas pierde encanto cuando todos se sienten iguales.", date: "2024-03-17", hoursGameplay: 50, sentiment: 35 },
    { comment: "El modo multijugador con amigos construyendo bases es increíblemente relajante.", date: "2024-04-30", hoursGameplay: 80, sentiment: 88 },
    { comment: "La actualización Worlds redefinió los planetas visualmente. Impresionante.", date: "2024-05-15", hoursGameplay: 90, sentiment: 94 },
    { comment: "El lanzamiento original fue una de las peores estafas del gaming. No olvidar.", date: "2024-06-23", hoursGameplay: 10, sentiment: -50 },
    { comment: "El sistema de construcción de naves y bases es muy satisfactorio.", date: "2024-07-01", hoursGameplay: 150, sentiment: 85 },
    { comment: "El juego VR es una experiencia completamente diferente y magnífica.", date: "2024-08-17", hoursGameplay: 70, sentiment: 91 },
    { comment: "Sean Murray cumplió su promesa aunque tardó años en hacerlo.", date: "2024-09-20", hoursGameplay: 110, sentiment: 80 },
    { comment: "La narrativa de misiones de expedición crea eventos comunitarios únicos.", date: "2024-10-09", hoursGameplay: 130, sentiment: 89 },
    { comment: "Sin narrativa lineal, la motivación para explorar se agota rápido.", date: "2024-04-13", hoursGameplay: 30, sentiment: 15 },
    { comment: "Todavía me sorprende encontrar planetas que se ven completamente únicos.", date: "2024-08-28", hoursGameplay: 200, sentiment: 93 },
  ],
};
