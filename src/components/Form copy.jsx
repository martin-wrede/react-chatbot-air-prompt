import React, {useState} from "react";

export default function Form(props){
        const  [ age , setAge ] = useState(0)
      const [sex, setSex] =  useState("")
      const [country, setCountry ] = useState("Deutschland")
      const [promptInfo, setPromptInfo] = useState({
        problem: "",
        solution: "",
        result: "",
        period: "", 
        date: "", 
        industry: ""
    }
    )

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
Du bist ein erfahrener Projektmanager.

Deine Aufgabe besteht aus zwei Schritten:

1. Du analysierst das gegebene Ziel, das der Benutzer dir nennt, und gibst eine vollständige Liste aller notwendigen Aufgaben aus, die erledigt werden müssen, um dieses Ziel zu erreichen.

2. Danach wandelst du diese Aufgaben in ein Google-Kalender-kompatibles Format (.ics) um. Für jeden Task legst du fest:
– Den Starttermin (beginnend am nächsten Werktag, also ohne Samstag/Sonntag),
– Eine Anfangszeit (z. B. 09:00 Uhr),
– Eine Dauer (z. B. 2 Stunden).

Du erzeugst daraus einen vollständigen .ics-Kalendertext, der vom Benutzer in Google Calendar importiert werden kann.

Antwortformat:
Zuerst gibst du die Aufgabenliste in Klartext aus (stichpunktartig oder nummeriert).  
Dann folgt der Kalender-Inhalt im .ics-Format, eingerahmt von den Tags \`\`\`ics und \`\`\`.

Beispiel:
\`\`\`ics
BEGIN:VCALENDAR
...
END:VCALENDAR
\`\`\`

Beginne erst mit deiner Analyse, wenn der Benutzer sein Ziel, Lösung und Zeitraum eingegeben hat.
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
        <div>
            Persönliche Daten: (fließen aktuell nicht in den Prompt mit ein)
     <br />     <br />

 <form onSubmit={handleSubmit}>
    
Alter
<br />
  
   <input
          type="text"
          name="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
     <br />     <br />
    Geschlecht
<br />
     <input
          type="text"
          name="sex"
          value={sex}
          onChange={(e) => setSex(e.target.value)}
        />
     <br />     <br />

  Aktueller Wohnort / Land: 
     <br />    

     <input
          type="text"
          name="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
     <br />     <br />  <br />
 
  <b>1 Welches Haupt-Problem willst du lösen?</b>
      <br />
  <input type="text"  name="problem" /> 

     <br />     <br />
 <b>2 Welche Lösung siehst Du dafür?</b>

   <br />
<input type="text"  name="solution" />
   <br /> <br />
  <b>3 In welchem Zeitraum willst Du das Ergebnis fertig haben - in Monaten? </b>
   <br />  
<input type="text"  name="period" />
     <br /> <br />
  <b>4 Welche Art von Ergebnis erwartest Du?</b>
  <br/>
    (z.B. Prototyp, fertiges Endprodukt)
    <input type="text"  name="result" />
   <br />  <br /> 

    <b>5 Wann ist der Projekt Start?</b>
  <br/>  <br/>
    (2025/06/01)
    <input type="text"  name="date" />
   <br />  


    <b>6 Wie würdest Du Deine Nische oder Industrie bezeichnen?</b>
  <br/>
    (z. B. Online, Warenverkauf, Dienstleistung)
    <input type="text"  name="industry" />
   <br />  

   

     <br /> <br />
     <button className="button" type="submit">
          Submit
        </button>
        
 </form>
 {gesamtPrompt}
        </div>
    )
}