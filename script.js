   /* const mainTextColor = getComputedStyle(root).getPropertyValue("--main-text-color").trim();*/
    /*const mainColor = getComputedStyle(root).getPropertyValue("--main-color").trim();*/
   /* const mainTextFont = getComputedStyle(root).getPropertyValue('--main-text-font');*/

    const root = document.querySelector(':root');
    const url = "http://lisademo.testsidorna.se/cgi-bin/WebObjects/nklt.woa/5/ra/site/lisademo/css/AACLorSvAAAH6ikBAAABiCZHgjA52tro/variables.json";

   /* const mainColor = getVar('--main-color');*/
   /* const mainCompColor = getVar('--main-comp-color');
    
    const mainTextFont = getVar('--main-text-font');
    const mainTextSize = getVar('--main-text-size'); 
    const mainTextWeight = getVar('--main-text-weight');
    const mainTextColor = getVar('--main-text-color');

    const mainHeadFont = getVar('--main-head-font');
    const mainHeadSize = getVar('--main-head-size'); 
    const mainHeadWeight = getVar('--main-head-weight');
    const mainHeadColor = getVar('--main-head-color');*/


   var variables = {
      "main-color": '#f4edbe',
      "main-comp-color": "#f1c2a3",
      "main-text-font": "'Courier New', Courier, monospace",
      "main-text-size": "12px",
      "main-text-weight": 400,
      "main-text-color": "#0B2293",
      "main-head-font": "'Courier New', Courier, monospace",
      "main-head-size": "12px",
      "main-head-weight": 900,
      "main-head-color": "#EBB2F2"
    }


    if (localStorage.getItem("variables") !== null){
      console.log(localStorage.getItem("variables"));
      variables = JSON.parse(localStorage.getItem("variables"));
      console.log("Data kommer från Serven");
    }

    else{
      var temp = getVars();
      console.log(`TEMP ${temp}`);
        if (temp !== undefined){

          variables = temp;
          console.log("Data kommer från server");
        }
        else{
          localStorage.setItem("variables", JSON.stringify(variables) );
        console.log("variables kommer finnas i localStorge igen");
        }

    }


   

     
    function storeValue() {

     //setVars(variables);

      alert("Data har uppdateras!");
      localStorage.removeItem("variables");

      }


  /**
   * A function to Get the CSS variables from Server using a spesific URL
   * @return the CSS variables
   */
  
  
  function getVars(){          
    //console.log("getVars");
      fetch(url)
      .then(response => response.json())
      .then(data => {

      /* console.log(`Fetch data ${data}`);*/

       return data;
  
      })

      .catch(error => {
      console.error('Error finns:', error);
      return undefined;
      });

    }


    

    /**
     * A function to Uppdate the CSS variables on the Server
     * 
     */

   function setVars(variables){

       fetch(url, {
        method: 'PUT',
       /* mode: 'cors',*/
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(variables)
      })
      
      .then(response => {
        console.log("check this");
        if (!response.ok) {

           // Request failed
           throw new Error('Error: anropet misslyckades med statuskod ' + response.status);
        } 
         
          console.log ('Data sattes framgångsrikt!');
           // Request was successful
           /*return response.json();*/

      })

      .catch(error => {
        // Handle any errors
        console.error("Fel vid sättning av data" , error);
      });

    }



    /*localStorage.setItem("variables", JSON.stringify(variables) );*/

   /* variables["main-color"] = "#fffffff";*/

   /* console.log(`${JSON.stringify(variables)}`);*/



    /** Create a function to return the value of variable,
        Either get values from global CSS variables if the value is not in local storage
        (in the beginning there is no value in localStorage) or get value from localStorage*/
  
        function getVar(variable){

        /* variables = JSON.parse(localStorage.getItem("variables"));*/
          
          var localValue = variables[variable];

          
          console.log(`localValue: ${localValue}`);
    
         /* var localValue = localStorage.getItem(variable);*/
    
          if (localValue === undefined) {
            localValue = getComputedStyle(root).getPropertyValue(variable).trim();
          }
          root.style.setProperty("--"+ variable, localValue);
                
          return localValue;
        }
    

  
    /*********** function to set a new value for the variable on both localStorage and CSS */
    function setVar(variable, value){

     /* variables = JSON.parse(localStorage.getItem("variables"));*/

      variables[variable] = value;
      localStorage.setItem("variables", JSON.stringify(variables) );

     /* localStorage.setItem(variable, value );*/
      root.style.setProperty("--"+ variable, value );
    }
  
    
/*--------------------------------------- Homepage colors Group ------------------------------------------*/  


 /***************************  Function to change Main Color (Huvudfärg) **********************************/ 

const mainColorElm = document.querySelector('#main-color-element');
mainColorElm.value = getVar('main-color');
  
var mainColorPikerElm = document.querySelector('#main-color-picker-element');
 
mainColorPikerElm.value = getVar('main-color');


mainColorPikerElm.addEventListener('input', (event) => {

  mainColorElm.value = event.target.value;      

  /*root.style.setProperty("--main-color",  bgColorElm.value );*/
  setVar("main-color", mainColorElm.value);

  });



/***************************  Function to change Complimentary Color (komplementfärg) **********************************/ 

/** set the color value of mainCompColor(value of CompColor in CSS) to the compColorElm(input field in HTML) */
const compColorElm = document.querySelector('#complementary-color-element');
compColorElm.value = getVar('main-comp-color');
  
/** set the color of color picker input to mainCompColor */
var compColorPikerElm = document.querySelector('#complementary-color-picker-element');
compColorPikerElm.value = getVar('main-comp-color');

compColorPikerElm.addEventListener('input', (event) => {

  compColorElm.value = event.target.value;      

   /*root.style.setProperty("--main-comp-color",  bgColorElm.value );*/
  setVar("main-comp-color", compColorElm.value)

  });

  
  /*--------------------------------------- Text Group ------------------------------------------*/

  /****************************  Function to change Text Font **********************/     

  /* To set the used font of the page text to a defalt value*/ 
  var fontSelectElm = document.getElementById('text-font-element');
    
  for(var i, j = 0; i = fontSelectElm.options[j]; j++) {

    var x = i.text;
      if(x == getVar('main-text-font')) {
        fontSelectElm.selectedIndex = j;
        break;
      }
      fontSelectElm.selectedIndex = j;
  }
    
  /*function for text font*/
  fontSelectElm.addEventListener('change', (event) => {

  fontSelectElm.value  = event.target.value;

  /*root.style.setProperty("--main-text-font", fontSelectElm.value);*/

  setVar("main-text-font", fontSelectElm.value);

  });

  
  
  /****************************  function to change Text Size **********************/     

  /* To set a defalt value of the Text Size */ 
  var textSizeSelectElm = document.getElementById('text-size-element');
    
  for(var i, j = 0; i = textSizeSelectElm.options[j]; j++) {

    var x = i.value;
      if(x == getVar('main-text-size')) {
        textSizeSelectElm.selectedIndex = j;
        break;
      }
      textSizeSelectElm.selectedIndex = j;
  }
    
  /*function for Text Size*/
  textSizeSelectElm.addEventListener('change', (event) => {

  textSizeSelectElm.value  = event.target.value;

  /*root.style.setProperty("--main-text-font", fontSelectElm.value);*/

  setVar("main-text-size", textSizeSelectElm.value);

  });



/****************************  function to change Text Weight **********************/     

/** */
  var textWeightSelectElm = document.getElementById('text-weight-element');
    
  for(var i, j = 0; i = textWeightSelectElm.options[j]; j++) {

    var x = i.value;
      if(x ==  getVar('main-text-weight')) {
        textWeightSelectElm.selectedIndex = j;
        break;
      }
      textWeightSelectElm.selectedIndex = j;
  }
    
  /*function for Text Weight*/
  textWeightSelectElm.addEventListener('change', (event) => {

  textWeightSelectElm.value  = event.target.value;

  /*root.style.setProperty("--main-text-font", fontSelectElm.value);*/

  setVar("main-text-weight", textWeightSelectElm.value);

  });



  /***************************  Function to change Text Color **********************************/ 

const textColorElm = document.querySelector('#text-color-element');
textColorElm.value = getVar('main-text-color');;
       
var textColorPikerElm = document.querySelector('#text-color-picker-element');
textColorPikerElm.value = getVar('main-text-color');;
 
textColorPikerElm.addEventListener('input', (event) => {

  textColorElm.value  = event.target.value;
                                                                                                                                 
  /** Call setVar function to set a new value for the text color  */
  setVar("main-text-color", textColorElm.value);                                                         /* root.style.setProperty("--main-text-color",  colorElm.value )*/
});  



/*--------------------------------------- Heading Group ------------------------------------------*/   


/***************************** function to change heading font **************************/

  /* To set the used font of the page text to a defalt value*/ 
  var headFontSelectElm = document.getElementById('head-font-element');
    
  for(var i, j = 0; i = headFontSelectElm.options[j]; j++) {

    var x = i.text;
      if(x == getVar('main-head-font')) {
        headFontSelectElm.selectedIndex = j;
        break;
      }
      headFontSelectElm.selectedIndex = j;
  }
    
  /*function to change heading font*/
  headFontSelectElm.addEventListener('change', (event) => {

  headFontSelectElm.value  = event.target.value;

  /*root.style.setProperty("--main-text-font", fontSelectElm.value);*/

  setVar("main-head-font", headFontSelectElm.value);

  });

  
  /****************************  function to change Heading Size **********************/     

  /* To set a defalt value of the Text Size */ 
  var headSizeSelectElm = document.getElementById('head-size-element');
    
  for(var i, j = 0; i = headSizeSelectElm.options[j]; j++) {

    var x = i.value;
      if(x == getVar('main-head-size')) {
        headSizeSelectElm.selectedIndex = j;
        break;
      }
      headSizeSelectElm.selectedIndex = j;
  }
    
  /*function for heading Size*/
  headSizeSelectElm.addEventListener('change', (event) => {

  headSizeSelectElm.value  = event.target.value;

  /*root.style.setProperty("--main-text-font", fontSelectElm.value);*/

  setVar("main-head-size", headSizeSelectElm.value);

  });



/****************************  function to change heading Weight **********************/     

/** */
  var headWeightSelectElm = document.getElementById('head-weight-element');
    
  for(var i, j = 0; i = headWeightSelectElm.options[j]; j++) {

    var x = i.value;
      if(x ==  getVar('main-head-weight')) {
        headWeightSelectElm.selectedIndex = j;
        break;
      }
      headWeightSelectElm.selectedIndex = j;
  }
    
  /*function for Text Weight*/
  headWeightSelectElm.addEventListener('change', (event) => {

  headWeightSelectElm.value  = event.target.value;

  /*root.style.setProperty("--main-text-font", fontSelectElm.value);*/

  setVar("main-head-weight", headWeightSelectElm.value);

  });



  /***************************  Function to change heading Color **********************************/ 

const headColorElm = document.querySelector('#head-color-element');
headColorElm.value =  getVar('main-head-color');;
       
var headColorPikerElm = document.querySelector('#head-color-picker-element');
headColorPikerElm.value =  getVar('main-head-color');;
 
headColorPikerElm.addEventListener('input', (event) => {

  headColorElm.value  = event.target.value;
                                                                                                                                 
  /** Call setVar function to set a new value for the text color  */
  setVar("main-head-color", headColorElm.value);                                                         /* root.style.setProperty("--main-text-color",  colorElm.value )*/
});  




