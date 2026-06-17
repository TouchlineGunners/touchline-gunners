import { useState, useRef, useEffect, useCallback } from "react";
import logo from "../../assets/logo.png";


// ─── DATABASE ────────────────────────────────────────────────────────────────
const ARSENAL_DB = [
  { name: "David O'Leary", career: "1973–1993", apps: 722, goals: 14 },
  { name: "Tony Adams", career: "1983–2002", apps: 669, goals: 48 },
  { name: "Lee Dixon", career: "1988–2002", apps: 619, goals: 28 },
  { name: "Nigel Winterburn", career: "1987–2000", apps: 584, goals: 12 },
  { name: "David Seaman", career: "1990–2003", apps: 564, goals: 0 },
  { name: "Ray Parlour", career: "1992–2004", apps: 466, goals: 32 },
  { name: "Martin Keown", career: "1985–2004", apps: 449, goals: 8 },
  { name: "Paul Davis", career: "1980–1994", apps: 447, goals: 37 },
  { name: "Paul Merson", career: "1986–1997", apps: 425, goals: 99 },
  { name: "Dennis Bergkamp", career: "1995–2006", apps: 423, goals: 120 },
  { name: "Patrick Vieira", career: "1996–2005", apps: 406, goals: 33 },
  { name: "Theo Walcott", career: "2006–2018", apps: 397, goals: 108 },
  { name: "Thierry Henry", career: "1999–2012", apps: 377, goals: 228 },
  { name: "Steve Bould", career: "1988–1999", apps: 372, goals: 22 },
  { name: "Aaron Ramsey", career: "2008–2019", apps: 369, goals: 64 },
  { name: "Laurent Koscielny", career: "2010–2019", apps: 353, goals: 27 },
  { name: "Alan Smith", career: "1987–1995", apps: 347, goals: 115 },
  { name: "Freddie Ljungberg", career: "1998–2007", apps: 328, goals: 72 },
  { name: "Kolo Toure", career: "2002–2009", apps: 326, goals: 14 },
  { name: "Bukayo Saka", career: "2018–", apps: 312, goals: 81 },
  { name: "Cesc Fabregas", career: "2003–2011", apps: 303, goals: 57 },
  { name: "John Lukic", career: "1984–1996", apps: 298, goals: 0 },
  { name: "Granit Xhaka", career: "2016–2023", apps: 297, goals: 23 },
  { name: "Ian Wright", career: "1991–1998", apps: 288, goals: 185 },
  { name: "Robert Pires", career: "2000–2006", apps: 284, goals: 84 },
  { name: "Bacary Sagna", career: "2007–2014", apps: 284, goals: 5 },
  { name: "Robin van Persie", career: "2004–2012", apps: 278, goals: 132 },
  { name: "Gabriel Martinelli", career: "2019–", apps: 278, goals: 62 },
  { name: "David Rocastle", career: "1985–1992", apps: 277, goals: 34 },
  { name: "Gael Clichy", career: "2003–2011", apps: 264, goals: 2 },
  { name: "Gabriel Magalhaes", career: "2020–", apps: 261, goals: 24 },
  { name: "Mesut Ozil", career: "2013–2020", apps: 254, goals: 44 },
  { name: "Olivier Giroud", career: "2012–2018", apps: 253, goals: 105 },
  { name: "Nacho Monreal", career: "2013–2019", apps: 251, goals: 10 },
  { name: "Mathieu Flamini", career: "2004–2016", apps: 246, goals: 13 },
  { name: "Tomas Rosicky", career: "2006–2016", apps: 246, goals: 28 },
  { name: "Gilberto Silva", career: "2002–2008", apps: 244, goals: 24 },
  { name: "Lauren", career: "2000–2006", apps: 241, goals: 9 },
  { name: "Hector Bellerin", career: "2013–2021", apps: 239, goals: 9 },
  { name: "Martin Odegaard", career: "2021–", apps: 234, goals: 42 },
  { name: "Kieran Gibbs", career: "2007–2017", apps: 230, goals: 6 },
  { name: "Kevin Campbell", career: "1988–1995", apps: 228, goals: 59 },
  { name: "Ashley Cole", career: "1999–2006", apps: 228, goals: 9 },
  { name: "Per Mertesacker", career: "2011–2018", apps: 221, goals: 10 },
  { name: "Emmanuel Eboue", career: "2005–2011", apps: 214, goals: 10 },
  { name: "Sol Campbell", career: "2001–2010", apps: 211, goals: 12 },
  { name: "Michael Thomas", career: "1987–1991", apps: 208, goals: 30 },
  { name: "Alexandre Lacazette", career: "2017–2022", apps: 206, goals: 71 },
  { name: "Alex Song", career: "2005–2012", apps: 204, goals: 10 },
  { name: "Perry Groves", career: "1986–1992", apps: 203, goals: 28 },
  { name: "Jens Lehmann", career: "2003–2011", apps: 200, goals: 0 },
  { name: "Nwankwo Kanu", career: "1999–2004", apps: 198, goals: 44 },
  { name: "Alex Oxlade-Chamberlain", career: "2011–2017", apps: 198, goals: 20 },
  { name: "Jack Wilshere", career: "2008–2018", apps: 197, goals: 14 },
  { name: "Ben White", career: "2021–", apps: 190, goals: 7 },
  { name: "William Saliba", career: "2022–", apps: 184, goals: 8 },
  { name: "Wojciech Szczesny", career: "2009–2015", apps: 181, goals: 0 },
  { name: "Abou Diaby", career: "2006–2015", apps: 180, goals: 19 },
  { name: "Santi Cazorla", career: "2012–2018", apps: 180, goals: 29 },
  { name: "Sylvain Wiltord", career: "2000–2004", apps: 175, goals: 49 },
  { name: "Manuel Almunia", career: "2004–2011", apps: 175, goals: 0 },
  { name: "Leandro Trossard", career: "2023–", apps: 174, goals: 36 },
  { name: "Nicklas Bendtner", career: "2005–2014", apps: 171, goals: 47 },
  { name: "Gilles Grimandi", career: "1997–2002", apps: 170, goals: 6 },
  { name: "Eddie Nketiah", career: "2017–2024", apps: 168, goals: 38 },
  { name: "Thomas Partey", career: "2020–2025", apps: 167, goals: 9 },
  { name: "Alexis Sanchez", career: "2014–2018", apps: 166, goals: 80 },
  { name: "Pierre-Emerick Aubameyang", career: "2018–2021", apps: 163, goals: 92 },
  { name: "Rob Holding", career: "2016–2023", apps: 162, goals: 5 },
  { name: "Mohamed Elneny", career: "2016–2024", apps: 161, goals: 6 },
  { name: "Francis Coquelin", career: "2008–2017", apps: 160, goals: 0 },
  { name: "Declan Rice", career: "2023–", apps: 158, goals: 21 },
  { name: "Andy Linighan", career: "1990–1996", apps: 156, goals: 8 },
  { name: "Denilson", career: "2006–2011", apps: 153, goals: 10 },
  { name: "Shkodran Mustafi", career: "2016–2020", apps: 151, goals: 9 },
  { name: "Thomas Vermaelen", career: "2009–2014", apps: 150, goals: 15 },
  { name: "Mikel Arteta", career: "2011–2016", apps: 150, goals: 16 },
  { name: "Alex Iwobi", career: "2015–2019", apps: 149, goals: 15 },
  { name: "David Raya", career: "2023–", apps: 147, goals: 0 },
  { name: "Johan Djourou", career: "2004–2012", apps: 144, goals: 1 },
  { name: "Andrey Arshavin", career: "2009–2013", apps: 144, goals: 31 },
  { name: "Kieran Tierney", career: "2019–2025", apps: 144, goals: 6 },
  { name: "David Hillier", career: "1990–1996", apps: 143, goals: 2 },
  { name: "Marc Overmars", career: "1997–2000", apps: 142, goals: 41 },
  { name: "Emmanuel Adebayor", career: "2006–2009", apps: 142, goals: 62 },
  { name: "William Gallas", career: "2006–2010", apps: 142, goals: 17 },
  { name: "Petr Cech", career: "2015–2019", apps: 139, goals: 0 },
  { name: "John Jensen", career: "1992–1996", apps: 138, goals: 1 },
  { name: "Martin Hayes", career: "1985–1990", apps: 132, goals: 34 },
  { name: "Ainsley Maitland-Niles", career: "2014–2021", apps: 132, goals: 3 },
  { name: "Alexander Hleb", career: "2005–2008", apps: 130, goals: 10 },
  { name: "Edu", career: "2001–2005", apps: 127, goals: 15 },
  { name: "Danny Welbeck", career: "2014–2019", apps: 126, goals: 32 },
  { name: "Samir Nasri", career: "2008–2011", apps: 125, goals: 27 },
  { name: "Bernd Leno", career: "2018–2022", apps: 125, goals: 0 },
  { name: "Gabriel Jesus", career: "2022–", apps: 123, goals: 32 },
  { name: "Kevin Richardson", career: "1987–1990", apps: 122, goals: 8 },
  { name: "Calum Chambers", career: "2014–2022", apps: 122, goals: 5 },
  { name: "Emmanuel Petit", career: "1997–2000", apps: 118, goals: 11 },
  { name: "Sead Kolasinac", career: "2017–2022", apps: 118, goals: 5 },
  { name: "Philippe Senderos", career: "2004–2009", apps: 117, goals: 4 },
  { name: "Anders Limpar", career: "1990–1994", apps: 116, goals: 20 },
  { name: "Emile Smith Rowe", career: "2018–2024", apps: 115, goals: 18 },
  { name: "Nicolas Pepe", career: "2019–2022", apps: 112, goals: 27 },
  { name: "Kai Havertz", career: "2023–", apps: 111, goals: 36 },
  { name: "Oleh Luzhnyi", career: "1999–2003", apps: 110, goals: 0 },
  { name: "Jose Antonio Reyes", career: "2004–2006", apps: 110, goals: 23 },
  { name: "David Platt", career: "1995–1998", apps: 108, goals: 15 },
  { name: "Pascal Cygan", career: "2002–2006", apps: 98, goals: 3 },
  { name: "Jurrien Timber", career: "2023–", apps: 95, goals: 6 },
  { name: "Niall Quinn", career: "1985–1990", apps: 94, goals: 20 },
  { name: "Nicolas Anelka", career: "1997–1999", apps: 91, goals: 28 },
  { name: "Oleksandr Zinchenko", career: "2022–2025", apps: 91, goals: 3 },
  { name: "Reiss Nelson", career: "2017–", apps: 90, goals: 8 },
  { name: "Lucas Torreira", career: "2018–2022", apps: 89, goals: 4 },
  { name: "Aaron Ramsdale", career: "2021–2024", apps: 89, goals: 0 },
  { name: "Steve Morrow", career: "1992–1997", apps: 85, goals: 3 },
  { name: "Takehiro Tomiyasu", career: "2021–2025", apps: 84, goals: 2 },
  { name: "Lukas Podolski", career: "2012–2014", apps: 82, goals: 31 },
  { name: "Matteo Guendouzi", career: "2018–2022", apps: 82, goals: 1 },
  { name: "Sylvinho", career: "1999–2001", apps: 80, goals: 5 },
  { name: "Jorginho", career: "2023–2025", apps: 79, goals: 2 },
  { name: "Lukasz Fabianski", career: "2007–2014", apps: 78, goals: 0 },
  { name: "Joe Willock", career: "2017–2021", apps: 78, goals: 11 },
  { name: "Mikel Merino", career: "2024–", apps: 78, goals: 15 },
  { name: "Stephen Hughes", career: "1994–2000", apps: 77, goals: 7 },
  { name: "Dani Ceballos", career: "2019–2021", apps: 77, goals: 2 },
  { name: "Myles Lewis-Skelly", career: "2024–", apps: 75, goals: 1 },
  { name: "David Luiz", career: "2019–2021", apps: 73, goals: 4 },
  { name: "John Hartson", career: "1995–1997", apps: 71, goals: 17 },
  { name: "Carl Jenkinson", career: "2011–2019", apps: 70, goals: 1 },
  { name: "David Ospina", career: "2014–2019", apps: 70, goals: 0 },
  { name: "Nelson Vivas", career: "1998–2001", apps: 69, goals: 1 },
  { name: "Sokratis Papastathopoulos", career: "2018–2021", apps: 69, goals: 6 },
  { name: "Justin Hoyte", career: "2003–2008", apps: 68, goals: 0 },
  { name: "Jakub Kiwior", career: "2023–2025", apps: 68, goals: 3 },
  { name: "Eduardo", career: "2007–2010", apps: 67, goals: 22 },
  { name: "Marouane Chamakh", career: "2010–2012", apps: 67, goals: 14 },
  { name: "Riccardo Calafiori", career: "2024–", apps: 65, goals: 4 },
  { name: "Alex Manninger", career: "1997–2001", apps: 64, goals: 0 },
  { name: "Giovanni van Bronckhorst", career: "2001–2003", apps: 64, goals: 2 },
  { name: "Gabriel Paulista", career: "2015–2017", apps: 64, goals: 1 },
  { name: "Cedric Soares", career: "2020–2024", apps: 64, goals: 2 },
  { name: "Gervinho", career: "2011–2013", apps: 63, goals: 11 },
  { name: "Carlos Vela", career: "2008–2011", apps: 62, goals: 11 },
  { name: "Brian Marwood", career: "1988–1990", apps: 61, goals: 17 },
  { name: "Ian Selley", career: "1992–1997", apps: 60, goals: 2 },
  { name: "Henrikh Mkhitaryan", career: "2018–2020", apps: 59, goals: 9 },
  { name: "Eddie McGoldrick", career: "1993–1995", apps: 57, goals: 1 },
  { name: "Martin Zubimendi", career: "2025–", apps: 57, goals: 6 },
  { name: "Matthew Upson", career: "1997–2003", apps: 56, goals: 0 },
  { name: "Viktor Gyokeres", career: "2025–", apps: 55, goals: 21 },
  { name: "Eberechi Eze", career: "2025–", apps: 52, goals: 10 },
  { name: "Gus Caesar", career: "1985–1990", apps: 51, goals: 0 },
  { name: "Jeremie Aliadiere", career: "2001–2007", apps: 51, goals: 9 },
  { name: "Ethan Nwaneri", career: "2022–", apps: 51, goals: 10 },
  { name: "Stefan Schwarz", career: "1994–1995", apps: 49, goals: 4 },
  { name: "Glenn Helder", career: "1995–1996", apps: 49, goals: 1 },
  { name: "Fabio Vieira", career: "2022–", apps: 49, goals: 3 },
  { name: "Christopher Wreh", career: "1997–2000", apps: 46, goals: 5 },
  { name: "Remi Garde", career: "1996–1999", apps: 43, goals: 0 },
  { name: "Mikael Silvestre", career: "2008–2010", apps: 43, goals: 3 },
  { name: "Noni Madueke", career: "2025–", apps: 43, goals: 8 },
  { name: "Joel Campbell", career: "2014–2016", apps: 40, goals: 4 },
  { name: "Luis Boa Morte", career: "1997–1999", apps: 39, goals: 4 },
  { name: "Davor Suker", career: "1999–2000", apps: 39, goals: 11 },
  { name: "Francis Jeffers", career: "2001–2003", apps: 39, goals: 8 },
  { name: "Sebastien Squillaci", career: "2010–2012", apps: 39, goals: 2 },
  { name: "Albert Sambi Lokonga", career: "2021–2025", apps: 39, goals: 0 },
  { name: "Piero Hincapie", career: "2025–", apps: 39, goals: 1 },
  { name: "Emiliano Martinez", career: "2012–2020", apps: 38, goals: 0 },
  { name: "Willian", career: "2020–2021", apps: 37, goals: 1 },
  { name: "Julio Baptista", career: "2006–2007", apps: 35, goals: 10 },
  { name: "Cristhian Mosquera", career: "2025–", apps: 35, goals: 0 },
  { name: "Andre Santos", career: "2011–2013", apps: 33, goals: 3 },
  { name: "Jimmy Carter", career: "1991–1994", apps: 32, goals: 2 },
  { name: "Armand Traore", career: "2006–2011", apps: 32, goals: 0 },
  { name: "Igors Stepanovs", career: "2000–2003", apps: 31, goals: 1 },
  { name: "Stuart Taylor", career: "2000–2003", apps: 30, goals: 0 },
  { name: "Mathieu Debuchy", career: "2014–2018", apps: 30, goals: 2 },
  { name: "Nuno Tavares", career: "2021–2025", apps: 28, goals: 1 },
  { name: "Raheem Sterling", career: "2024–2025", apps: 28, goals: 1 },
  { name: "Scott Marshall", career: "1993–1997", apps: 27, goals: 1 },
  { name: "Paul Dickov", career: "1993–1996", apps: 26, goals: 7 },
  { name: "Jermaine Pennant", career: "1999–2005", apps: 26, goals: 3 },
  { name: "Gavin Hoyte", career: "2008–", apps: 25, goals: 0 },
  { name: "Colin Pates", career: "1990–1992", apps: 25, goals: 1 },
  { name: "Yossi Benayoun", career: "2011–2012", apps: 25, goals: 5 },
];

// ─── LOOKUP ──────────────────────────────────────────────────────────────────
function normalise(s) {
  return s.trim().toLowerCase()
    .replace(/[àáâã]/g,"a").replace(/[èéê]/g,"e").replace(/[ìíî]/g,"i")
    .replace(/[òóô]/g,"o").replace(/[ùúû]/g,"u").replace(/ø/g,"o")
    .replace(/[čć]/g,"c").replace(/ž/g,"z").replace(/š/g,"s")
    .replace(/ñ/g,"n").replace(/ß/g,"ss").replace(/ł/g,"l")
    .replace(/ð/g,"d").replace(/['']/g,"'");
}

// Returns: { exact: Player } | { ambiguous: Player[] } | null
function lookupPlayer(raw) {
  const q = normalise(raw);
  if (!q) return null;

  const matches = new Set();

  ARSENAL_DB.forEach(p => {
    const normName = normalise(p.name);
    const parts = normName.split(" ");
    const surname = parts[parts.length - 1];
    const firstName = parts[0];

    // Full name match
    if (normName === q) { matches.add(p); return; }
    // Exact surname match
    if (surname === q) { matches.add(p); return; }
    // Exact first name match (only if unique enough — handled after)
    if (firstName === q) { matches.add(p); return; }
    // Single-word name (Lauren, Denilson, etc.)
    if (parts.length === 1 && normName === q) { matches.add(p); return; }
    // Handle "van persie", "oxlade-chamberlain" etc — last word of hyphenated
    if (surname.includes("-")) {
      const afterHyphen = surname.split("-").pop();
      if (afterHyphen === q) { matches.add(p); return; }
    }
    // "smith rowe" two-word surname
    if (parts.length >= 3) {
      const twoWordSurname = parts.slice(-2).join(" ");
      if (twoWordSurname === q) { matches.add(p); return; }
    }
  });

  const arr = [...matches];
  if (arr.length === 0) return null;
  if (arr.length === 1) return { exact: arr[0] };
  return { ambiguous: arr };
}

// ─── DARTS LOGIC ─────────────────────────────────────────────────────────────
const BOGEY = new Set([163, 166, 169, 172, 173, 175, 176, 178, 179]);

// ─── MODES ───────────────────────────────────────────────────────────────────
const MODES = [
  { id: "apps",     label: "Appearances",  desc: "Career appearances only",        getValue: p => p.apps },
  { id: "goals",    label: "Goals",        desc: "Career goals only",              getValue: p => p.goals },
  { id: "combined", label: "Apps + Goals", desc: "Appearances and goals combined", getValue: p => p.apps + p.goals },
];

// ─── SINGLE PLAYER TARGET MODES ──────────────────────────────────────────────
const SP_MODES = [
  { id: "practice", label: "Practice Run",     desc: "Just get to 0 — no pressure, no timer" },
  { id: "par",      label: "Beat the Par",     desc: "Reach 0 in as few turns as possible" },
  { id: "timed",    label: "Against the Clock",desc: "Reach 0 before time runs out" },
];
const PAR_TARGET = 9; // "par" for 501 in 9 turns (darts standard)
const TIMER_SECONDS = 120;

// ─── COLOURS ─────────────────────────────────────────────────────────────────
const C = {
  red:"#EF0107", redDark:"#9E0005", gold:"#E8B84B", goldLight:"#F5D27A",
  white:"#FFFFFF", charcoal:"#161616", mid:"#252525", dark:"#1C1C1C",
  grey:"#777", border:"#2A2A2A", p1:"#EF0107", p2:"#3B82F6",
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function statLabel(mode, player) {
  const m = MODES.find(m => m.id === mode);
  const v = m.getValue(player);
  if (mode === "apps")     return `${v} apps`;
  if (mode === "goals")    return `${v} goals`;
  return `${player.apps} apps + ${player.goals} goals = ${v}`;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Arsenal501() {
  // Setup state
  const [phase, setPhase]         = useState("setup"); // setup | playing | final | over
  const [gameType, setGameType]   = useState("2p");    // 2p | 1p
  const [p1Name, setP1Name]       = useState("");
  const [p2Name, setP2Name]       = useState("");
  const [scoringMode, setScoringMode] = useState("combined");
  const [spMode, setSpMode]       = useState("practice");

  // Game state
  const [scores, setScores]       = useState([501, 501]);
  const [turn, setTurn]           = useState(0);
  const [inputVal, setInputVal]   = useState("");
  const [log, setLog]             = useState([]);
  const [feedback, setFeedback]   = useState(null);
  const [usedNames, setUsedNames] = useState(new Set());
  const [finalState, setFinalState] = useState(null);
  const [winner, setWinner]       = useState(null);
  const [setupErr, setSetupErr]   = useState("");
  const [turnCount, setTurnCount] = useState(0);

  // Disambiguation
  const [disambig, setDisambig]   = useState(null); // Player[] | null

  // Timer (single player timed mode)
  const [timeLeft, setTimeLeft]   = useState(TIMER_SECONDS);
  const timerRef                  = useRef(null);

  const inputRef = useRef(null);
  const logRef   = useRef(null);

  const pNames  = [p1Name || "Player 1", p2Name || "Player 2"];
  const pColors = [C.p1, C.p2];
  const activeMode = MODES.find(m => m.id === scoringMode);
  const is1P = gameType === "1p";

  // ── Focus input on turn change ───────────────────────────────────────────
  useEffect(() => {
    if ((phase === "playing" || phase === "final") && inputRef.current && !disambig) {
      inputRef.current.focus();
    }
  }, [phase, turn, disambig]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [log]);

  // ── Timer ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase === "playing" && is1P && spMode === "timed") {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            setPhase("over");
            setWinner({ timeUp: true, score: scores[0] });
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [phase]);

  // ── Auto-submit on exact full-surname match ───────────────────────────────
  useEffect(() => {
    if (!inputVal.trim() || disambig) return;
    const result = lookupPlayer(inputVal.trim());
    if (result && result.exact) {
      // Only auto-submit if the typed string IS exactly a full surname/name
      // (not a prefix). Guard: the normalised query must match surname exactly.
      const q = normalise(inputVal.trim());
      const p = result.exact;
      const parts = normalise(p.name).split(" ");
      const surname = parts[parts.length - 1];
      const fullNorm = normalise(p.name);
      if (q === surname || q === fullNorm || (parts.length === 1 && q === fullNorm)) {
        submitPlayer(result.exact);
      }
    } else if (result && result.ambiguous) {
      // Check if this is an exact surname match triggering disambig
      const q = normalise(inputVal.trim());
      const allSurnameMatch = result.ambiguous.every(p => {
        const parts = normalise(p.name).split(" ");
        return parts[parts.length - 1] === q;
      });
      if (allSurnameMatch) setDisambig(result.ambiguous);
    }
  }, [inputVal]);

  function addLog(msg, type = "info") {
    setLog(l => [...l, { msg, type, id: Date.now() + Math.random() }]);
  }

  function startGame() {
    if (!p1Name.trim()) { setSetupErr("Please enter a name."); return; }
    if (!is1P && !p2Name.trim()) { setSetupErr("Please enter both player names."); return; }
    setSetupErr("");
    const initScore = 501;
    setScores([initScore, initScore]);
    setTurn(0);
    setLog([{ msg: `Game started — ${is1P ? p1Name : `${pNames[0]} vs ${pNames[1]}`} — Mode: ${activeMode.label}${is1P ? ` — ${SP_MODES.find(m=>m.id===spMode).label}` : ""}`, type: "gold", id: 0 }]);
    setUsedNames(new Set());
    setFinalState(null);
    setWinner(null);
    setFeedback(null);
    setInputVal("");
    setDisambig(null);
    setTurnCount(0);
    setTimeLeft(TIMER_SECONDS);
    setPhase("playing");
  }

  function submitPlayer(player) {
    setInputVal("");
    setDisambig(null);

    if (usedNames.has(player.name)) {
      setFeedback({ type: "warn", msg: `${player.name} has already been used this game!` });
      return;
    }

    const m = MODES.find(m => m.id === scoringMode);
    const value = m.getValue(player);
    const sl = statLabel(scoringMode, player);

    if (value > 180) {
      setFeedback({ type: "bad", msg: `💥 BUST! ${player.name} — ${sl} — over 180. Score unchanged.` });
      addLog(`${pNames[turn]} → ${player.name} (${sl}) — BUST >180`, "bad");
      advanceTurn();
      return;
    }
    if (BOGEY.has(value)) {
      setFeedback({ type: "bad", msg: `🎯 FOUL! ${player.name} — ${sl} — bogey number. Score unchanged.` });
      addLog(`${pNames[turn]} → ${player.name} (${sl}) — FOUL bogey`, "bad");
      advanceTurn();
      return;
    }

    const newScores = [...scores];
    const prev = newScores[turn];
    const next = prev - value;
    newScores[turn] = next;

    setUsedNames(u => new Set([...u, player.name]));
    setScores(newScores);
    setTurnCount(c => c + 1);
    setFeedback({ type: "good", msg: `✅ ${player.name} — ${sl} — ${pNames[turn]}: ${prev} → ${next}` });
    addLog(`${pNames[turn]} → ${player.name} (${sl}) — ${prev} → ${next}`, "good");

    if (next <= 0) {
      if (is1P) {
        clearInterval(timerRef.current);
        setPhase("over");
        setWinner({ solo: true, score: next, turns: turnCount + 1 });
        return;
      }
      if (finalState === null) {
        setFinalState({ breakerIdx: turn, breakerScore: next });
        const other = 1 - turn;
        addLog(`🎯 ${pNames[turn]} broke zero (${next})! ${pNames[other]} — ONE final turn!`, "gold");
        setFeedback({ type: "gold", msg: `🎯 ${pNames[turn]} broke zero on ${next}! ${pNames[other]} — your final turn!` });
        setPhase("final");
        setTurn(other);
        return;
      } else {
        const challenger = next;
        const breaker = finalState.breakerScore;
        const winIdx = Math.abs(challenger) < Math.abs(breaker) ? turn : finalState.breakerIdx;
        const winScore = winIdx === turn ? challenger : breaker;
        setWinner({ idx: winIdx, score: winScore });
        setPhase("over");
        return;
      }
    }

    if (phase === "final") {
      setWinner({ idx: finalState.breakerIdx, score: finalState.breakerScore });
      addLog(`${pNames[turn]} couldn't break zero. ${pNames[finalState.breakerIdx]} wins!`, "gold");
      setPhase("over");
      return;
    }

    advanceTurn();
  }

  function advanceTurn() {
    if (!is1P) setTurn(t => 1 - t);
  }

  function handleInput(e) {
    setInputVal(e.target.value);
    setDisambig(null);
    setFeedback(null);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !disambig) {
      const raw = inputVal.trim();
      if (!raw) return;
      const result = lookupPlayer(raw);
      if (!result) {
        setFeedback({ type: "bad", msg: `"${raw}" not found. Must be an Arsenal player active from 1989.` });
        addLog(`${pNames[turn]} → "${raw}" — NOT FOUND`, "bad");
        setInputVal("");
        return;
      }
      if (result.exact) { submitPlayer(result.exact); return; }
      if (result.ambiguous) { setDisambig(result.ambiguous); return; }
    }
    if (e.key === "Escape") { setDisambig(null); setInputVal(""); setFeedback(null); }
  }

  function resetAll() {
    setPhase("setup"); setP1Name(""); setP2Name(""); setScoringMode("combined");
    setSpMode("practice"); setScores([501,501]); setTurn(0); setLog([]);
    setUsedNames(new Set()); setFinalState(null); setWinner(null);
    setFeedback(null); setInputVal(""); setDisambig(null); setTurnCount(0);
    clearInterval(timerRef.current);
  }

  function playAgain() {
    setScores([501,501]); setTurn(0); setLog([]); setUsedNames(new Set());
    setFinalState(null); setWinner(null); setFeedback(null); setInputVal("");
    setDisambig(null); setTurnCount(0); setTimeLeft(TIMER_SECONDS);
    setPhase("playing");
  }

  const fbC = { good:"#6EE7B7", bad:"#FCA5A5", warn:C.goldLight, gold:C.goldLight };
  const logC = { good:"#6EE7B7", bad:"#FCA5A5", gold:C.goldLight, info:"#555" };

  const fmtTime = s => `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;
  const timerPct = timeLeft / TIMER_SECONDS;
  const timerColor = timerPct > 0.4 ? "#6EE7B7" : timerPct > 0.2 ? C.goldLight : "#FCA5A5";

  // Shared input area render
  const turnName = is1P ? pNames[0] : pNames[turn];
  const turnColor = is1P ? C.p1 : pColors[turn];

  return (
    <div style={{ minHeight:"100vh", background:C.charcoal, color:C.white, fontFamily:"'Arial Black',Arial,sans-serif", display:"flex", flexDirection:"column", alignItems:"center" }}>
      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
        @keyframes slidein{from{opacity:0;transform:translateY(-5px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}
        button:hover{opacity:.85;cursor:pointer}
        input:focus{outline:none;border-color:#E8B84B !important}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:#333;border-radius:2px}
      `}</style>

      {/* HEADER */}
      <div style={{ width:"100%", background:C.red, borderBottom:`4px solid ${C.gold}`, padding:"8px 16px", boxSizing:"border-box", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <img src={logo} alt="Touchline Gunners" style={{ height:58, width:58, objectFit:"contain", flexShrink:0 }} />
        <div style={{ textAlign:"center", flex:1 }}>
          <div style={{ fontSize:26, fontWeight:900, letterSpacing:4, textShadow:"2px 2px 0 rgba(0,0,0,.35)" }}>ARSENAL 501</div>
          <div style={{ fontSize:10, letterSpacing:5, color:C.goldLight, fontFamily:"Arial,sans-serif", fontWeight:400 }}>THE GUNNERS DARTS CHALLENGE</div>
        </div>
        <div style={{ width:58, flexShrink:0 }} />
      </div>

      <div style={{ width:"100%", maxWidth:680, padding:"20px 16px 48px", boxSizing:"border-box", position:"relative" }}>
        <div style={{ position:"fixed", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:360, height:360, backgroundImage:`url(${logo})`, backgroundSize:"contain", backgroundRepeat:"no-repeat", backgroundPosition:"center", opacity:0.045, pointerEvents:"none", zIndex:0 }} />

        {/* ══ SETUP ══ */}
        {phase === "setup" && (
          <div style={{ background:C.mid, borderRadius:10, padding:28, border:`1px solid ${C.border}` }}>
            <div style={{ fontSize:11, letterSpacing:4, color:C.gold, textTransform:"uppercase", marginBottom:18, fontFamily:"Arial,sans-serif" }}>New Game</div>

            {/* Game type toggle */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:20 }}>
              {[{id:"2p",label:"2 Players"},{id:"1p",label:"1 Player"}].map(gt => (
                <button key={gt.id} onClick={() => setGameType(gt.id)} style={{
                  background: gameType===gt.id ? C.red : C.dark,
                  border:`1px solid ${gameType===gt.id ? C.red : C.border}`,
                  borderRadius:6, padding:"11px 0", color:C.white, fontSize:13,
                  fontWeight:900, letterSpacing:2, textTransform:"uppercase",
                  fontFamily:"'Arial Black',Arial,sans-serif", transition:"all .15s"
                }}>{gt.label}</button>
              ))}
            </div>

            {/* Player names */}
            <div style={{ display:"grid", gridTemplateColumns: is1P ? "1fr" : "1fr 1fr", gap:12, marginBottom:20 }}>
              {(is1P ? [0] : [0,1]).map(i => (
                <div key={i}>
                  <div style={{ fontSize:10, letterSpacing:2, color:pColors[i], textTransform:"uppercase", fontFamily:"Arial,sans-serif", marginBottom:6 }}>
                    {is1P ? "Your Name" : `Player ${i+1}`}
                  </div>
                  <input
                    style={{ width:"100%", boxSizing:"border-box", background:C.dark, border:`1px solid ${pColors[i]}`, borderRadius:4, color:C.white, padding:"10px 12px", fontSize:15, fontFamily:"Arial,sans-serif" }}
                    value={i===0 ? p1Name : p2Name}
                    onChange={e => i===0 ? setP1Name(e.target.value) : setP2Name(e.target.value)}
                    placeholder={is1P ? "Your name…" : `Player ${i+1} name…`}
                    onKeyDown={e => e.key==="Enter" && startGame()}
                  />
                </div>
              ))}
            </div>

            {/* Scoring mode */}
            <div style={{ marginBottom: is1P ? 16 : 24 }}>
              <div style={{ fontSize:10, letterSpacing:2, color:C.grey, textTransform:"uppercase", fontFamily:"Arial,sans-serif", marginBottom:10 }}>Scoring Mode</div>
              <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                {MODES.map(m => (
                  <button key={m.id} onClick={() => setScoringMode(m.id)} style={{
                    background:scoringMode===m.id ? C.red : C.dark,
                    border:`1px solid ${scoringMode===m.id ? C.red : C.border}`,
                    borderRadius:6, padding:"11px 14px", textAlign:"left", color:C.white,
                    display:"flex", justifyContent:"space-between", alignItems:"center", transition:"all .15s"
                  }}>
                    <div>
                      <div style={{ fontSize:13, fontWeight:700, letterSpacing:1, fontFamily:"'Arial Black',Arial,sans-serif" }}>{m.label}</div>
                      <div style={{ fontSize:11, color:scoringMode===m.id?"rgba(255,255,255,.7)":C.grey, marginTop:2, fontFamily:"Arial,sans-serif" }}>{m.desc}</div>
                    </div>
                    {scoringMode===m.id && <div style={{ width:9, height:9, borderRadius:"50%", background:C.gold, flexShrink:0 }}/>}
                  </button>
                ))}
              </div>
            </div>

            {/* Single player mode */}
            {is1P && (
              <div style={{ marginBottom:24 }}>
                <div style={{ fontSize:10, letterSpacing:2, color:C.grey, textTransform:"uppercase", fontFamily:"Arial,sans-serif", marginBottom:10 }}>Challenge Mode</div>
                <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                  {SP_MODES.map(m => (
                    <button key={m.id} onClick={() => setSpMode(m.id)} style={{
                      background:spMode===m.id ? "#1A3A1A" : C.dark,
                      border:`1px solid ${spMode===m.id ? "#4ADE80" : C.border}`,
                      borderRadius:6, padding:"11px 14px", textAlign:"left", color:C.white,
                      display:"flex", justifyContent:"space-between", alignItems:"center", transition:"all .15s"
                    }}>
                      <div>
                        <div style={{ fontSize:13, fontWeight:700, letterSpacing:1, fontFamily:"'Arial Black',Arial,sans-serif" }}>{m.label}</div>
                        <div style={{ fontSize:11, color:spMode===m.id?"rgba(255,255,255,.7)":C.grey, marginTop:2, fontFamily:"Arial,sans-serif" }}>{m.desc}{m.id==="par"?` (target: ${PAR_TARGET} turns)`:""}{m.id==="timed"?` (${fmtTime(TIMER_SECONDS)})`:""}</div>
                      </div>
                      {spMode===m.id && <div style={{ width:9, height:9, borderRadius:"50%", background:"#4ADE80", flexShrink:0 }}/>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {setupErr && <div style={{ color:"#FCA5A5", fontSize:13, fontFamily:"Arial,sans-serif", marginBottom:12 }}>{setupErr}</div>}

            <button onClick={startGame} style={{ width:"100%", background:C.red, color:C.white, border:"none", borderRadius:6, padding:14, fontSize:14, fontWeight:900, letterSpacing:3, textTransform:"uppercase", fontFamily:"'Arial Black',Arial,sans-serif" }}>
              Start Game
            </button>

            <div style={{ marginTop:20, background:"#111", borderRadius:6, padding:"13px 15px", fontFamily:"Arial,sans-serif", fontSize:12, color:C.grey, lineHeight:1.75 }}>
              <div style={{ color:C.gold, fontWeight:700, letterSpacing:2, fontSize:10, textTransform:"uppercase", marginBottom:7 }}>Rules</div>
              <div>Name Arsenal players (active 1989+). Their stat value reduces your score from 501.</div>
              <div style={{marginTop:5}}><span style={{color:"#FCA5A5"}}>BUST</span> — stat over 180. Turn void.</div>
              <div><span style={{color:"#FCA5A5"}}>FOUL</span> — bogey number (163,166,169,172,173,175,176,178,179). Turn void.</div>
              <div><span style={{color:C.goldLight}}>WIN</span> — reach 0 or below. In 2P, opponent gets one final turn. Closest to 0 wins.</div>
            </div>
          </div>
        )}

        {/* ══ PLAYING / FINAL ══ */}
        {(phase === "playing" || phase === "final") && (
          <>
            {/* Top bar: mode + timer */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginBottom:14, flexWrap:"wrap" }}>
              <span style={{ background:C.border, color:C.gold, fontSize:10, letterSpacing:3, textTransform:"uppercase", padding:"4px 12px", borderRadius:20, fontFamily:"Arial,sans-serif" }}>
                {activeMode.label}
              </span>
              {is1P && spMode==="par" && (
                <span style={{ background:C.border, color:"#4ADE80", fontSize:10, letterSpacing:2, textTransform:"uppercase", padding:"4px 12px", borderRadius:20, fontFamily:"Arial,sans-serif" }}>
                  Turn {turnCount} / par {PAR_TARGET}
                </span>
              )}
              {is1P && spMode==="timed" && (
                <span style={{ background:C.dark, color:timerColor, fontSize:14, fontWeight:900, letterSpacing:2, padding:"4px 14px", borderRadius:20, fontFamily:"'Arial Black',Arial,sans-serif", border:`1px solid ${timerColor}33` }}>
                  ⏱ {fmtTime(timeLeft)}
                </span>
              )}
            </div>

            {/* Score boards */}
            <div style={{ display:"grid", gridTemplateColumns: is1P ? "1fr" : "1fr 1fr", gap:10, marginBottom:14 }}>
              {(is1P ? [0] : [0,1]).map(i => {
                const active = is1P || turn===i;
                const isFinal = !is1P && phase==="final" && turn===i;
                const score = scores[i];
                return (
                  <div key={i} style={{
                    background: i===0 ? "#1A0808" : "#080816",
                    borderRadius:8, padding:"16px 20px",
                    border:`2px solid ${active ? pColors[i] : C.border}`,
                    boxShadow: active ? `0 0 24px ${pColors[i]}33` : "none",
                    transition:"all .2s", position:"relative"
                  }}>
                    {isFinal && (
                      <div style={{ position:"absolute", top:8, right:8, background:C.gold, color:C.charcoal, fontSize:8, fontWeight:900, padding:"2px 6px", borderRadius:3, letterSpacing:1, textTransform:"uppercase" }}>
                        FINAL TURN
                      </div>
                    )}
                    <div style={{ fontSize:10, letterSpacing:3, textTransform:"uppercase", fontFamily:"Arial,sans-serif", color: active ? pColors[i] : C.grey, marginBottom:4, display:"flex", alignItems:"center", gap:6 }}>
                      {active && !is1P && <span style={{ width:7, height:7, borderRadius:"50%", background:pColors[i], display:"inline-block", animation:"pulse 1s infinite" }}/>}
                      {pNames[i]}
                    </div>
                    <div style={{ fontSize: score<0||score>999?40:54, fontWeight:900, lineHeight:1, color: score<=0?"#6EE7B7" : score<=50?C.gold : C.white }}>
                      {score}
                    </div>
                    {is1P && spMode==="timed" && (
                      <div style={{ marginTop:10, height:4, background:C.border, borderRadius:2 }}>
                        <div style={{ height:"100%", width:`${timerPct*100}%`, background:timerColor, borderRadius:2, transition:"width 1s linear" }}/>
                      </div>
                    )}
                    <div style={{ fontSize:9, letterSpacing:2, color:"#444", textTransform:"uppercase", fontFamily:"Arial,sans-serif", marginTop:6 }}>to go</div>
                  </div>
                );
              })}
            </div>

            {/* Input area */}
            <div style={{ background:C.mid, borderRadius:8, padding:"16px 18px", marginBottom:10, border:`1px solid ${C.border}` }}>
              <div style={{ fontSize:10, letterSpacing:3, color:C.gold, textTransform:"uppercase", fontFamily:"Arial,sans-serif", marginBottom:10 }}>
                {phase==="final" ? `⚡ ${turnName.toUpperCase()} — FINAL TURN` : is1P ? `${turnName.toUpperCase()}` : `${turnName.toUpperCase()}'S TURN`}
              </div>

              {/* Disambiguation picker */}
              {disambig ? (
                <div style={{ animation:"slidein .15s ease" }}>
                  <div style={{ fontSize:12, color:C.goldLight, fontFamily:"Arial,sans-serif", marginBottom:10 }}>
                    Multiple matches — choose one:
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                    {disambig.map(p => (
                      <button
                        key={p.name}
                        onClick={() => submitPlayer(p)}
                        style={{
                          background: C.dark,
                          border:`1px solid ${C.border}`,
                          borderRadius:6, padding:"10px 14px", color:C.white,
                          textAlign:"left"
                        }}
                      >
                        <div style={{ fontSize:13, fontWeight:700, fontFamily:"'Arial Black',Arial,sans-serif" }}>{p.name}</div>
                        <div style={{ fontSize:11, color:C.grey, fontFamily:"Arial,sans-serif", marginTop:2 }}>{p.career}</div>
                      </button>
                    ))}
                  </div>
                  <button onClick={() => { setDisambig(null); setInputVal(""); }} style={{ marginTop:10, background:"transparent", border:`1px solid ${C.border}`, borderRadius:4, color:C.grey, padding:"6px 14px", fontSize:11, fontFamily:"Arial,sans-serif" }}>
                    Cancel
                  </button>
                </div>
              ) : (
                <input
                  ref={inputRef}
                  style={{ width:"100%", boxSizing:"border-box", background:C.dark, border:`1px solid ${C.border}`, borderRadius:4, color:C.white, padding:"11px 14px", fontSize:16, fontFamily:"Arial,sans-serif" }}
                  value={inputVal}
                  onChange={handleInput}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a surname — auto-submits on match…"
                />
              )}

              {feedback && !disambig && (
                <div style={{ marginTop:10, padding:"8px 12px", background:"#0D0D0D", borderRadius:4, fontSize:13, fontFamily:"Arial,sans-serif", color:fbC[feedback.type]||C.grey, lineHeight:1.5, animation:"slidein .15s ease" }}>
                  {feedback.msg}
                </div>
              )}
            </div>

            {/* Log */}
            <div ref={logRef} style={{ background:"#0D0D0D", borderRadius:8, padding:"12px 14px", maxHeight:190, overflowY:"auto", border:`1px solid ${C.border}`, fontFamily:"Arial,sans-serif", fontSize:12 }}>
              {log.length===0 && <div style={{ color:"#333", fontStyle:"italic" }}>Game log…</div>}
              {log.map(e => <div key={e.id} style={{ padding:"3px 0", borderBottom:"1px solid #161616", color:logC[e.type]||"#555" }}>{e.msg}</div>)}
            </div>

            <div style={{ marginTop:9, textAlign:"center", fontSize:10, color:"#333", letterSpacing:1, fontFamily:"Arial,sans-serif" }}>
              BOGEYS: 163·166·169·172·173·175·176·178·179·&gt;180
            </div>
          </>
        )}
      </div>

      {/* ══ WINNER OVERLAY ══ */}
      {phase === "over" && winner && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.88)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:99 }}>
          <div style={{ background:C.mid, border:`3px solid ${C.gold}`, borderRadius:12, padding:"36px 40px", textAlign:"center", maxWidth:380, width:"90%", animation:"slidein .2s ease" }}>
            <div style={{ fontSize:44, marginBottom:8 }}>
              {winner.timeUp ? "⏰" : "🎯"}
            </div>

            {/* Time-up state */}
            {winner.timeUp && (
              <>
                <div style={{ fontSize:10, letterSpacing:5, color:"#FCA5A5", textTransform:"uppercase", fontFamily:"Arial,sans-serif", marginBottom:10 }}>Time's Up!</div>
                <div style={{ fontSize:28, fontWeight:900, color:C.p1, fontFamily:"'Arial Black',Arial,sans-serif" }}>{pNames[0]}</div>
                <div style={{ fontSize:13, color:C.grey, fontFamily:"Arial,sans-serif", margin:"8px 0 4px" }}>finished on</div>
                <div style={{ fontSize:52, fontWeight:900, color:"#FCA5A5", fontFamily:"'Arial Black',Arial,sans-serif", lineHeight:1 }}>{winner.score}</div>
                <div style={{ fontSize:12, color:"#555", fontFamily:"Arial,sans-serif", marginTop:6, marginBottom:24 }}>Better luck next time!</div>
              </>
            )}

            {/* Solo win */}
            {winner.solo && (
              <>
                <div style={{ fontSize:10, letterSpacing:5, color:C.gold, textTransform:"uppercase", fontFamily:"Arial,sans-serif", marginBottom:10 }}>
                  {spMode==="par" && turnCount <= PAR_TARGET ? "Under Par! 🏆" : spMode==="par" ? `${turnCount} turns (par ${PAR_TARGET})` : "Complete!"}
                </div>
                <div style={{ fontSize:28, fontWeight:900, color:C.p1, fontFamily:"'Arial Black',Arial,sans-serif" }}>{pNames[0]}</div>
                <div style={{ fontSize:13, color:C.grey, fontFamily:"Arial,sans-serif", margin:"8px 0 4px" }}>finished on</div>
                <div style={{ fontSize:52, fontWeight:900, color:C.gold, fontFamily:"'Arial Black',Arial,sans-serif", lineHeight:1 }}>{winner.score}</div>
                <div style={{ fontSize:13, color:C.grey, fontFamily:"Arial,sans-serif", marginTop:6 }}>in <span style={{color:C.white,fontWeight:700}}>{winner.turns}</span> turns
                  {spMode==="par" && <span style={{color: winner.turns<=PAR_TARGET?"#4ADE80":"#FCA5A5"}}> ({winner.turns<=PAR_TARGET?`${PAR_TARGET-winner.turns} under par`:`${winner.turns-PAR_TARGET} over par`})</span>}
                  {spMode==="timed" && <span style={{color:C.goldLight}}> with {fmtTime(timeLeft)} left</span>}
                </div>
                <div style={{ marginBottom:24 }}/>
              </>
            )}

            {/* 2P win */}
            {!winner.timeUp && !winner.solo && (
              <>
                <div style={{ fontSize:10, letterSpacing:5, color:C.gold, textTransform:"uppercase", fontFamily:"Arial,sans-serif", marginBottom:8 }}>Winner</div>
                <div style={{ fontSize:32, fontWeight:900, color:pColors[winner.idx], fontFamily:"'Arial Black',Arial,sans-serif", textShadow:`0 0 20px ${pColors[winner.idx]}` }}>{pNames[winner.idx]}</div>
                <div style={{ fontSize:13, color:C.grey, fontFamily:"Arial,sans-serif", margin:"6px 0 4px" }}>finished on</div>
                <div style={{ fontSize:56, fontWeight:900, color:C.gold, fontFamily:"'Arial Black',Arial,sans-serif", lineHeight:1 }}>{winner.score}</div>
                <div style={{ fontSize:12, color:"#555", fontFamily:"Arial,sans-serif", margin:"10px 0 22px" }}>
                  {pNames[0]}: {scores[0]} · {pNames[1]}: {scores[1]}
                </div>
              </>
            )}

            <div style={{ display:"flex", gap:10 }}>
              <button onClick={playAgain} style={{ flex:1, background:C.gold, color:C.charcoal, border:"none", borderRadius:6, padding:13, fontSize:13, fontWeight:900, letterSpacing:2, textTransform:"uppercase", fontFamily:"'Arial Black',Arial,sans-serif" }}>
                Play Again
              </button>
              <button onClick={resetAll} style={{ flex:1, background:"transparent", color:C.grey, border:`1px solid ${C.border}`, borderRadius:6, padding:13, fontSize:13, fontWeight:700, letterSpacing:2, textTransform:"uppercase", fontFamily:"Arial,sans-serif" }}>
                New Game
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
