import React, {useState} from "react";

export default function Form(props){
        const  [ age , setAge ] = useState(0)
      const [sex, setSex] =  useState("")
      const [country, setCountry ] = useState("Deutschland")
      const [promptInfo, setPromptInfo] = useState({
        problem: "Zu wenig Lehrer",
        solution: "flexiblere Arbeitszeiten",
        result: "Software",
        period: "12", 
        date: "", 
        industry: "Software"
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

let AIRole = "Du bist ein Projektmanager und listest die notwendigen Aufgaben auf, die Erfüllung des Ziels notwendig sind. In einem zweiten Schritt berechnest Du sie in einen Google Kalender Format (ics) herunter. Du kannst als nächsten Starttermin einfach den folgenden Tag verwenden. Samstage und Sonntag sind frei."  
let prompt = "1. Mein Problem, was ich lösen möchte ist: " + formData.get("problem")
 + " // 2. Die Lösung, die ich aktuell sehe ist: " + formData.get("solution")
 +  " // 3. Ich sehe das Ergebnis in der Form von: " + formData.get("result")
 +  " // 4. Der Zeitraum den ich einplane ist in Monaten: " + formData.get("period")
  +  " // 5. Das Start Datum ist: " + formData.get("date")  
 +  " // 6. Die Industrie oder Nische ist: " + formData.get("industry");

 const fullPrompt = AIRole + prompt;
props.onPromptChange(fullPrompt);
console.log(fullPrompt);

 

props.onPromptChange(AIRole + prompt);

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
  <b>3 In welchem Zeitraum willst Du das Ergebnis fertig haben (in Monaten)?</b>
   <br />  
<input type="text"  name="period" />
 <b>4 In welchem Zeitraum willst Du das Ergebnis fertig haben (in Monaten)?</b>
   <br />  
<input type="text"  name="period" />
     <br /> <br />
  <b>5 Start Datum</b>
  <br/>
    
    <input type="date"  name="date" />
   <br />  <br /> 

    <b>6 Wie würdest Du Deine Nische oder Industrie bezeichnen?</b>
  <br/>
    (Online, Warenverkauf, Dienstleistung)
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