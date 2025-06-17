import React, {useState} from "react";

export default function Form(){
        const  [ age , setAge ] = useState("")
      const [sex, setSex] =  useState("")
      const [country, setCountry ] = useState("Deutschland")
      const [promptInfo, setPromptInfo] = useState({
        problem: "",
        solution: "",
        result: "",
        period: "", 
        industry: "", 
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
    industry: formData.get("industry"),
  });

let AIRole = "Du bist ein Projektmanager und listest die notwendigen Aufgaben auf, die Erfüllunge des Ziels notwendig sind. In einem zweiten Schritt berechnest Du sie in einen Google Kalender Format (ics) herunter. Du kannst als nächsten Starttermin einfach den folgenden Tag verwenden. Samstage und Sonntag sind frei."  
let prompt = "1. Mein Problem, was ich lösen möchte ist: " + formData.get("problem")
 + " // 2. Die Lösung, die ich aktuell sehe ist: " + formData.get("solution")
 +  " // 3. Ich sehe das Ergebnis in der Form von: " + formData.get("result");
 +  " // 4. Der Zeitraum den ich einplane ist in Monaten: " + formData.get("period");
 +  " // 5. Die Industrie oder Nische ist: " + formData.get("industry");

// setGesamtPrompt()
console.log(prompt);
 //   console.log("Prompt Info:", {
  //  problem: formData.get("problem"),
  //  solution: formData.get("solution"),
  //  result: formData.get("result"),
  //  period: formData.get("period"),
   // industry: formData.get("industry"),
 // };
};

   
    return(
        <div>
            Persönliche Daten: (fließen aktuell nicht in den Prompt mit ein)
     <br />     <br />

 <form onSubmit={handleSubmit}>
    
Alter
<br />
  <input  type="text" name="age" 
  //onChange={changeAge}
   />
     <br />     <br />
    Geschlecht
<br />
  <input  type="text" name="sex" 
  // onChange={changeSex}
  />
     <br />     <br />

  Aktueller Wohnort / Land: 
     <br />    

   <input  type="text" defaultValue="Deutschland"  name="country" 
   // onChange={changeCountry} 
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
  <b>3 In welchem Zeitraum willst Du das Ergebnis fertig haben?</b>
   <br />  
<input type="text"  name="period" />
     <br /> <br />
  <b>4 Welche Art von Ergebnis erwartest Du?</b>
  <br/>
    (Prototyp, fertiges Endprodukt)
    <input type="text"  name="result" />
   <br />  <br /> 

    <b>5 Wie würdest Du Deine Nische oder Industrie bezeichnen?</b>
  <br/>
    (Online, Warenverkauf, Dienstleistung)
    <input type="text"  name="industry" />
   <br />  

   

     <br /> <br />
     <button className="button" type="submit">
          Submit
        </button>
        
 </form>
 {promptInfo.period}
        </div>
    )
}