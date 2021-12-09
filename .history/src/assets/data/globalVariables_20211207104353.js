 
 /**
  * This objects contains the VALID and EXISTING pages that are navigable
  * Each of this page can be found under the 'pages' folder, a direct child of the 'src'
  */

 export const globalVariables = {
   //Local links
   about: "/about-project/about",
   doc: "/about-project/documentation",
   contact: "/contact",
   error: "/404",
   home: "/",
   journals: "/journals",
   network: "/network",
   people: "/people",

   author_bg: "/background/author-bg/author-bg",
   quaker_bg: "/background/quaker-bg",
   background: "/background/background",

   //Links to background pages.
   timeline: "/background/author-background/timeline",
   bookshelf: "/background/john-hunt/7-bookshelf",
   form_of_the_journal: "/background/quaker-bg/0-Form_of_the_Journal",
   introduction: "/background/john-hunt/1-introducing-john-hunt",
   family: "/background/john-hunt/3-family",
   mentors_role_models: "/background/john-hunt/5-mentors-role-models",
   /background/john-hunt/2-why-keep-a-journal
   bibliography: "/background/author-background/bibliography",
   
   glossary: "/background/quaker-bg/glossary",
   quaker_world: "/background/john-hunt/4-quaker-world",
   all_in_one: "/background/allInOne",

   quaker_meeting_structure: "/background/quaker-bg/structure-society-friends",

   //External links
   swat: "https://www.swarthmore.edu/",
   fhl: "https://www.swarthmore.edu/friends-historical-library",
   lib: "https://www.swarthmore.edu/libraries",
   tricoLib:
     "https://digitalcollections.tricolib.brynmawr.edu/institution/swarthmore-college",
   swatAddressMap: "https://goo.gl/maps/xmThPZhXkFwh9e2b9",
 };

 export const contacts = {
   swat: {
     address: "500 College Ave, Swarthmore, PA 19081",
     phone: " (610) 328-8000",
     email: "admissions@swarthmore.edu",
   },
   fhl: {
     address: "500 College Ave, Swarthmore, PA 19081",
     phone: " (610) 328-8496",
     email: "friends@swarthmore.edu",
   },
   library: {
     address: "500 College Ave, Swarthmore, PA 19081",
     phone: " (610) 328-8477",
     email: "circ@swarthmore.edu",
   },
 };

 export const months = [
    { name: "January", abbr: "Jan" },
    { name: "Febuary", abbr: "Feb" },
    { name: "March", abbr: "Mar" },
    { name: "April", abbr: "Apr" },
    { name: "May", abbr: "May" },
    { name: "June", abbr: "Jun" },
    { name: "July", abbr: "Jul" },
    { name: "August", abbr: "Aug" },
    { name: "September", abbr: "Sep" },
    { name: "October", abbr: "Oct" },
    { name: "November", abbr: "Nov" },
    { name: "December", abbr: "Dec" },
 ];
