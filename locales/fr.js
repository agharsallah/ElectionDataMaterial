module.exports = {
 AutoSuggest: {
    Title: 'Aide à l\'enregistrement ',
    SubTitle:'Le concept de municipalité étant nouveau pour les citoyens, cette application vise à permettre aux agents de l\'ISIE de déterminer sur la base d\'une adresse la municipalité à laquelle ce citoyen est rattaché.' ,
    SubmitButton:'soumettre',
    InputGuide:'Entrez votre Gouvernorat ...',
    sub1:'Le concept de municipalité étant nouveau pour les citoyens,',
    sub2:'cette application vise à permettre aux citoyens de connaitre sur la base d\'une adresse la municipalité à laquelle ils sont rattaché.',
    rk1:'remarque: Les délimitations de municipalité utilisé sont prochent de réalité mais peuvent y contenir quelques erreurs .On a aussi utilsé presque 4600 bureau de vote qui peuvent changer un peut dans ces élections ',
    loading:'Chargement ...'
 },
 Geocode: {
    InputGuide:'"Name of the Avenue or road here"',
    GoogleRadio: 'Google',
    OSMRadio: 'OSM',
    AvailableInfo0:'Entrer l\'adresse du citoyen ou un endroit proche de son adresse (édifice publique..) ',
    AvailableInfo:'La municipalitée est : ',
    AvailableInfo2:'. Gouvernorat de :',
    AvailableInfoar:'',
    InavailableInfo:'désolé impossible de trouver l\'adresse, veuillez écrire d\'une autre façon ou essayer un autre service(open street map..)',
    BackButton:'Retour',
    PollingCheck:'Centre de Vote',
    RegistrationCheck:'Centre d\'enregistrement',
        WhereAmI:"mon emplacement ",
            download:' lieu d\'enregistrement'


 },
  filter: {
    placeholder:'vérifier le carreau au dessus et choisir le CV',
 },
  statDrawer: {
     open: "ouvrir filtre" ,
     menu:"menu"
 },
  registrationMapKey:{
     title:"Registration Map Key :",
     shopping:"Centre commercial",
     post:"Poste",
     transport:"Station de transport",
     service:"Service",
     municipality:"Municipalité"
 },
 navbar:{
    ar:"العربية",
     fr:"Français",
     en:"English",
     about:"about",
     viz:"vizualizations",
     language:"Languages",
     sitetitle:"Visualization des données électorales"
 },
 vizroot:{
    title:"Donnée de l'élection municipale",

    detailedRegTitle:"Inscription des citoyens par sexe et âge",
    detailedRegDesc:"Visualisation des citoyens enregistrés selon l'âge et le sexe jusqu'à 10-07-2017 - (données fournies par ISIE)",
    
    dailyRegLineTitle:"Nombre d'enregistrement quotidien (Graphiques)",
    dailyRegLineDesc:"Analyse de la densité d'enregistrement et de mises à jour des élections municipales - (données fournies par ISIE)",
     
    dailyRegTitle:"Nombre d'enregistrement quotidien (Carte)",
    dailyRegDesc:"Analyse de la densité d'enregistrement et de mises à jour des élections municipales - (données fournies par ISIE)",
     
    newmunTitle:"Informations générales sur les commune",
    newmunDesc:"Identification rapide de type des communes: nouvelles,ancien et étandue",
     
    statisticsTitle:"Sélection des municipalités selon les critères",
    statisticsDesc:"Filter the 350 municipalities based on Population and Area",

},
projectSection: {
    READMORE: "Read More"
},
MenuDrawer: {
    MENU: "Menu",
    THEME: "Choose a Theme",
    REGVSELG: "Registered vs Eligible",
    ACTIVEREG: "Active Registered",
    VOTERPROFILE: "Voter Profile",
    GENDERRADIO: "Map By Gender",
    ALL: "All",
    FEMALE: "Females",
    MALE: "Male",
    MAPKEY: "Map Key ",
    BACK: "Back",
    SLIDERTITLE: "Map Age Slider",
    OPTIONTITLE: "Chart Options :",
    MALE_FEMALE_DIFF: "male/female difference",
    AGEPER: "Age Percentage",
    zoomplaceholder: "choose a mun"
},
RegVsElig: {
    TITLE: "Registered Versus Eligible Voters",
    SUBTITLE: "Registered till 10-08 | Eligible voters from INS data 2014",
    ELIGIBLE: "Eligible",
    REGISTERED: "Registered",
    REGELG: "Registered from Eligible",
    NONREG: "Non Registered",
    ALLKEY: "Percentage of Registered from Eligible",
    MALEKEY: "Male percentage of Registered from Eligible",
    FEMALEKEY: "Female percentage of Registered from Eligible"
},
ScatterReg: {
    SCATTER_TITLE: "Registered Versus Eligible",
    SCATTER_TITLE_MALE: "Registered Versus Eligible Male ",
    SCATTER_TITLE_FEMALE: "Registered Versus Eligible Female ",
    Governorate: "Governorate",
    Male: "Male",
    Female: "Female",
    Regression: "Regression Line",
    Ideal: "Ideal",
    Eligible: "Eligible Voters",
    Registered: "Registered Voters"

},
ActiveReg: {
    activeReg: "Active registered",
    totalReg: "Registered in total",
    newReg: "Registered in 2017",
    title: "Active Registerd Voters",
    subtitle: "Active registered voters since the beginning of municipal election",
    keytitle: "Percentage of active registered voters"
},
VoterProfile: {
    totalReg: "total registered ",
    maleReg: "registered male",
    femaleReg: "Registered female",
    voteDiff: "voters Difference ",
    gov: "Governorate",
    mun: "Municipality",
    keytitleDiff: "male vs female",
    regTranche: ": registered ",
    otherReg: ": Other registered ",
    title: "Voter Profile",
    subtitle: "This map shows upon choosing an age category which is more male or female ",
    femaleMore: "Female are more",
    maleMore: "Male are more ",
    keyTitleDiff18: "18-24 male vs female",
    keyTitleRegPerc18: "Percentage of registered 18-24",
    keyTitleDiff25: "25-35 male vs female",
    keyTitleRegPerc25: "Percentage of registered 25-35",
    keyTitleDiff36: "36-50 male vs female",
    keyTitleRegPerc36: "Percentage of registered 36-50",
    keyTitleDiff50: "+50 male vs female",
    keyTitleRegPerc50: "Percentage of registered +50",

    keyTitleRegPerc18_latest: "Percentage of registered 18-35",
    keyTitleRegPerc25_latest: "Percentage of registered 36-40",
    keyTitleRegPerc36_latest: "Percentage of registered 41-60",
    keyTitleRegPerc50_latest: "Percentage of registered +60"

},
BarMaleFemaleDiff: {
    title: "difference in voters gender -",
    subtitle: "if the color is red than difference is in favor of female <br/> else in favor of male",
    yaxe: "voteres gender difference number"
},
HistogramVoterProfile: {
    Male: "Male",
    Female: "Female",
    population: "Population:",
    totalNumber: "Total Number:",
    click: "Click on the map",
    registered:'Registered'
},
TooltipPie: {
    registerd: "registered",
    otherReg: "Other Registered Tranches"
},
LineChart: {
    LineChart: "",
    source: "Source: ISIE.tn",
    numberOf: "Number of ",
    registration: "Registration",
    update: "Update",
    TitleDaily: "Daily ",
    TitleNumber: " Number",
    regression: "Regression Line",
    valuefor: 'The value for <b style="color:blue">',
    increased: " increase compared to the last day",
    decreased: " decrease compared to the last day ",
    Sunday: "Sunday",
    Monday: "Monday",
    Tuesday: "Tuesday",
    Wednesday: "Wednesday",
    Thursday: "Thursday",
    Friday: "Friday",
    Saturday: "Saturday"
},

radioComp: {
    all: "All",
    old: "Old",
    new: "New",
    extended: "Extended",
}, TwoMaps: {
    internetuse: "internet Usage",
    illetracy: "Citizens Illetracy",
    sociotitle: "Social Parameter",
    electionsubject: "Election Parameter",
    registration: "Registration",
    turnout: "Turnout",
    higher_enrolment: "higher Education Enrolement"
},
RegistrationMap: {
    parlimantary: "parlimantary 2014",
    _2011: "NCA 2011",
    ElectionYear: "Election Year",
    Delegation: "Delegation",
    District: "District",
    VC: "Voting Center",
},
navbar: {
    ar: "العربية",
    fr: "Français",
    en: "English",
    about: "About",
    other: "Other Viz",
    mun: "Municipal",
    electData: "Election Data",
    elecResult: "Election Result",
    webRadar: "Web Radar",
    home: "Home",
    oldViz: "Old Viz",
    maps: "Maps"
},
home: {
    sectionMunicipalData: "Municipal Data",
    sectionMunicipalData_b: "Municipal",
    sectionElectionData: "Election Data",
    sectionElectionResult: "Election Result",
    sectionotherViz: "Other Viz",
    sectionWebradar: "WebRadar",
    sectionAbout: "About",

    munDataTitle1: "Administrative Structure",
    munDataTitle2: "Municipal Registration",
    munDataTitle3: "Municipal Registration Performance",
    munDataTitle4: "Lists Overview",
    munDataTitle2_b: "Registration",
    munDataTitle3_b: "Registration Performance",


    electDataTitle1: "Invalid Ballots",
    electDataTitle2: "Turnout",
    electDataTitle3: "Socio Election Map",

    electResultData1: 'NCA Results 2011',
    electResultData2: 'Parliamentary 2014',
    electResultData3: 'Presidential 2014 ',
    electResultData4: 'Full Results',
    electResultData5: 'Archive'

},
listsOverview: {
    independent: 'Independent lists',
    total: 'Total lists',
    party: 'Party lists',
    coalition: 'Coalition lists',
    //Viz theme button
    general: 'General',
    munMap: 'Municipality Map',
    govMap: 'Governorate Map',
    //general
    //title
    listsOverview: 'General lists overview',
    listsDist: 'Lists Distribution',
    CandidatesOverview: 'General Candidates overview',
    partyRanking: 'Ranking of Candidates Lists per Party',
    //sidebar
    sideListsOverview: 'Lists Overview',
    sideCandidatesOverview: 'Candidates Overview',
    sidePartyRanking: 'Party Ranking per list number',
    //type-viz buttons
    barChart: 'Bar Chart',
    pieChart: 'Pie Chart',
    slider: 'Slider',
    Image: 'Image',
    ImageDetail: 'Image from the official document of ISIE',
    //barchart highchart Viz :
    listNumber: 'Lists Number',
    partyList: 'Party List',
    independentList: 'Independent List',
    coalitionList: 'Coalition List',
    liste: 'list',
    //Lists distribution highchart Viz :
    munNumber: 'Municipalities number',
    munHave: 'municipalities have ',
    consigne: 'Move the slider to discover the ',
    consigne2: 'distribution ',
    consigne3: 'of candidates Lists in municipalities.',
    exist: ' There exists ',
    have: 'That have ',
    mun: ' municipalities ',
    lists: ' lists ',
    //Lists candidates Overview :
    candNum: ' Number of candidates ',
    candAge: ' Candidates age ',
    candidates: ' candidates ',
    listNum: ' Number of candidates ',
    parties: ' parties '
},
listsGov: {
    title: 'Number Of Total Lists per governorate (05-04-2018)',
    listsNum: ' lists number ',
    candidatesNum: ' Candidates number ',
    average: ' Average Lists number per gov ',
    highest: ' Highest Lists number per gov ',
    lowest: ' Lowest Lists number per gov ',
    Registration_number: ' Registration number ',
}
}