import React, {useState} from "react";

export default function Form(props){
    const [age, setAge] = useState(0)
    const [sex, setSex] = useState("")
    const [country, setCountry] = useState("Deutschland")
    const [promptInfo, setPromptInfo] = useState({
        problem: "",
        solution: "",
        result: "",
        period: "", 
        date: "", 
        industry: ""
    })

    const [gesamtPrompt, setGesamtPrompt] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        setPromptInfo({
            problem: formData.get("problem"),
            solution: formData.get("solution"),
            result: formData.get("result"),
            period: formData.get("period"),
            date: formData.get("date"),
            industry: formData.get("industry"),
        });

        let AIRole = `
Du bist ein erfahrener Projektmanager mit Expertise in Zeitplanung und Ressourcenverteilung.

Deine Aufgabe besteht aus drei Schritten:

1. **AUFGABENANALYSE**: Analysiere das gegebene Ziel und erstelle eine vollständige, realistische Liste aller notwendigen Aufgaben, um dieses Ziel zu erreichen. Berücksichtige dabei:
   - Logische Abhängigkeiten zwischen Aufgaben
   - Realistische Arbeitszeiten pro Aufgabe
   - Pufferzeiten für unvorhergesehene Probleme
   - Verschiedene Aufgabentypen (Planung, Umsetzung, Testing, Review)

2. **ZEITVERTEILUNG**: Verteile die Aufgaben gleichmäßig über die GESAMTE verfügbare Projektdauer:
   - Nutze die KOMPLETTE angegebene Zeitspanne in Monaten
   - 1 Monat = ca. 20-22 Werktage (ohne Wochenenden)
   - Beispiel: 3 Monate = ca. 60-66 Werktage verfügbar
   - Verteile Aufgaben strategisch über die gesamte Laufzeit
   - Berücksichtige logische Reihenfolgen und Abhängigkeiten
   - Plane realistische Arbeitszeiten pro Tag (nicht mehr als 6-8 Stunden produktive Arbeit)

3. **KALENDER-ERSTELLUNG**: Wandle die zeitlich verteilten Aufgaben in ein Google-Kalender-kompatibles Format (.ics) um:
   - Starttermin: Der angegebene Projektstart-Termin
   - Arbeitszeiten: Werktage von Montag bis Freitag
   - Uhrzeiten: Zwischen 09:00 und 17:00 Uhr
   - Aufgaben-Dauer: 1-4 Stunden pro Aufgabe (je nach Komplexität)
   - Termine gleichmäßig über die GESAMTE Projektlaufzeit verteilen

**WICHTIGE REGELN für die Zeitverteilung:**
- Bei 1 Monat Projektdauer: Nutze ca. 20-22 Werktage
- Bei 2 Monaten: Nutze ca. 40-44 Werktage  
- Bei 3 Monaten: Nutze ca. 60-66 Werktage
- Verteile Aufgaben vom Startdatum bis zum Ende der Projektlaufzeit
- Keine Termine an Wochenenden (Samstag/Sonntag)
- Berücksichtige deutsche Feiertage wenn möglich

**Antwortformat:**
1. Zuerst: Aufgabenliste mit geschätzter Dauer pro Aufgabe
2. Dann: Zeitplan-Übersicht (welche Aufgaben in welcher Projektwoche)
3. Zuletzt: Vollständiger .ics-Kalender eingerahmt von \`\`\`ics und \`\`\`

Beispiel für Zeitverteilung bei 2 Monaten (8 Wochen):
- Woche 1-2: Planungsphase
- Woche 3-4: Erste Umsetzungsphase  
- Woche 5-6: Hauptumsetzung
- Woche 7: Testing und Optimierung
- Woche 8: Finalisierung und Abschluss

Beginne erst mit deiner Analyse, wenn der Benutzer alle Projektdaten eingegeben hat.
`;

        let prompt = "1. Mein Problem, was ich lösen möchte ist: " + formData.get("problem")
         + " // 2. Die Lösung, die ich aktuell sehe ist: " + formData.get("solution")
         +  " // 3. Ich sehe das Ergebnis in der Form von: " + formData.get("result")
         +  " // 4. Der Zeitraum den ich einplane ist in Monaten: " + formData.get("period")
          +  " // 5. Der Projektstart ist am: " + formData.get("date")
         +  " // 6. Die Industrie oder Nische ist: " + formData.get("industry");

        const fullPrompt = AIRole + "\n\n" + prompt;

        console.log(fullPrompt);
        props.onPromptChange(fullPrompt);
    };

    return(
        <div style={{maxWidth: '800px', margin: '0 auto', padding: '20px'}}>
            <div style={{backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px', marginBottom: '20px'}}>
                <h3 style={{margin: '0 0 10px 0', color: '#333'}}>Persönliche Daten</h3>
                <p style={{margin: '0', fontSize: '14px', color: '#666'}}>
                    (fließen aktuell nicht in den Prompt mit ein)
                </p>
            </div>

            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px'}}>
                    <div>
                        <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>Alter</label>
                        <input
                            type="number"
                            name="age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            style={{width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px'}}
                        />
                    </div>
                    
                    <div>
                        <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>Geschlecht</label>
                        <input
                            type="text"
                            name="sex"
                            value={sex}
                            onChange={(e) => setSex(e.target.value)}
                            style={{width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px'}}
                        />
                    </div>
                    
                    <div>
                        <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>Aktueller Wohnort / Land</label>
                        <input
                            type="text"
                            name="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            style={{width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px'}}
                        />
                    </div>
                </div>

                <div style={{backgroundColor: '#e3f2fd', padding: '20px', borderRadius: '8px', border: '2px solid #2196F3'}}>
                    <h3 style={{margin: '0 0 20px 0', color: '#1976D2'}}>📋 Projekt-Informationen</h3>
                    
                    <div style={{marginBottom: '20px'}}>
                        <label style={{display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '16px'}}>
                            1️⃣ Welches Haupt-Problem willst du lösen?
                        </label>
                        <input 
                            type="text" 
                            name="problem" 
                            placeholder="z.B. Ich möchte eine Website für mein lokales Restaurant erstellen..."
                            style={{width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '6px', fontSize: '14px'}}
                            required
                        />
                    </div>

                    <div style={{marginBottom: '20px'}}>
                        <label style={{display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '16px'}}>
                            2️⃣ Welche Lösung siehst Du dafür?
                        </label>
                        <input 
                            type="text" 
                            name="solution"
                            placeholder="z.B. Eine moderne WordPress-Website mit Online-Reservierungssystem..."
                            style={{width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '6px', fontSize: '14px'}}
                            required
                        />
                    </div>

                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px'}}>
                        <div>
                            <label style={{display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '16px'}}>
                                3️⃣ Projektdauer (in Monaten)
                            </label>
                            <input 
                                type="number" 
                                name="period"
                                placeholder="z.B. 2"
                                min="1"
                                max="12"
                                style={{width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '6px', fontSize: '14px'}}
                                required
                            />
                            <small style={{color: '#666', fontSize: '12px', marginTop: '4px', display: 'block'}}>
                                1 Monat ≈ 20-22 Werktage
                            </small>
                        </div>
                        
                        <div>
                            <label style={{display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '16px'}}>
                                5️⃣ Projekt-Startdatum
                            </label>
                            <input 
                                type="date" 
                                name="date"
                                style={{width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '6px', fontSize: '14px'}}
                                required
                            />
                        </div>
                    </div>

                    <div style={{marginBottom: '20px'}}>
                        <label style={{display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '16px'}}>
                            4️⃣ Welche Art von Ergebnis erwartest Du?
                        </label>
                        <input 
                            type="text" 
                            name="result"
                            placeholder="z.B. Voll funktionsfähige Website mit Content Management System..."
                            style={{width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '6px', fontSize: '14px'}}
                            required
                        />
                        <small style={{color: '#666', fontSize: '12px', marginTop: '4px', display: 'block'}}>
                            z.B. Prototyp, MVP, fertiges Endprodukt, Konzept, etc.
                        </small>
                    </div>

                    <div style={{marginBottom: '20px'}}>
                        <label style={{display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '16px'}}>
                            6️⃣ Wie würdest Du Deine Nische oder Industrie bezeichnen?
                        </label>
                        <input 
                            type="text" 
                            name="industry"
                            placeholder="z.B. Gastronomie, E-Commerce, Beratung, Software-Entwicklung..."
                            style={{width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '6px', fontSize: '14px'}}
                            required
                        />
                    </div>
                </div>

                <button 
                    type="submit"
                    style={{
                        padding: '15px 30px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        alignSelf: 'center',
                        minWidth: '200px'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
                >
                    🚀 Projektplan erstellen
                </button>
            </form>

            {gesamtPrompt && (
                <div style={{marginTop: '30px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px'}}>
                    <h4>Generierter Prompt:</h4>
                    <pre style={{whiteSpace: 'pre-wrap', fontSize: '12px', maxHeight: '200px', overflow: 'auto'}}>
                        {gesamtPrompt}
                    </pre>
                </div>
            )}
        </div>
    )
}