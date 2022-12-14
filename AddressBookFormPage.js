let contactObject = {}
window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const nameError = document.querySelector('.name-error');
    name.addEventListener('input', function () {
        let names = document.querySelector('#name').value.split(" ");
        if (name.value.length == 0) {
            nameError.textContent = "";
            return;
        }
        try {
            (new Contact()).firstName = names[0];
            (new Contact()).lastName = names[1];
            nameError.textContent = '';
        } catch (e) {
            nameError.textContent = e;
        }
    });


    const phoneElement = document.querySelector('#phone');
    const phoneError = document.querySelector('.phone-error');
    phoneElement.addEventListener('input', function () {
        let phone = document.querySelector('#phone').value;

        try {
            (new Contact()).phone = phone;
            phoneError.textContent = '';
        } catch (e) {
            phoneError.textContent = e;
        }
    });


})

const save = (event)=>{

  try{
    setContactObject();
  }catch(e){
    console.log(e);
    return;
  }
}

const setContactObject = () => {
    let contactObject = new Contact()
    let names = getInputValueById('#name').split(" ");
    contactObject._firstName = names[0];
    contactObject._lastName = names[1];
    contactObject._address = getInputValueById('#address');
    contactObject._city = getInputValueById('#city');
    contactObject._state = getInputValueById('#state');
    contactObject._zip = getInputValueById('#zip');
    contactObject._phone = getInputValueById('#phone');
    alert(contactObject.toString())
  }
  const createAddressBook = () =>{
    let addressbook = new Contact();
    let names = getInputValueById('#name').split(" ");
  addressbook._firstName = names[0];
  addressbook._lastName = names[1];
  addressbook._address = getInputValueById('#address');
  addressbook._city = getInputValueById('#city');
  addressbook._state = getInputValueById('#state');
  addressbook._zip = getInputValueById('#zip');
  addressbook._phone = getInputValueById('#phone');
  alert(addressbook)

}

  const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
  }

  const resetForm = () => {
    setValue('#name','');
    setValue('#address','');
    setValue('#city','Select City');
    setValue('#state','Select State');
    setValue('#zip','');
    setValue('#phone','');
}

const setValue = (id,value) => {
  let element = document.querySelector(id);
  return element.value = value;
}

const setTextValue = (id,value) => {
  let element = document.querySelector(id);
  element.textContent = value;
}

const createAndUpdateStorage = () => {
  let contactList = JSON.parse(localStorage.getItem("ContactList"));
  if(contactList){
      let contactData = contactList.
        find(contact => contact._id == contactObject._id);
      if(!contactData)
      contactList.push(createContactData());
      else{
          const index = contactList.map(cnt => cnt._id).indexOf(contactData._id);
          contactList.splice(index,1,createContactData(contactData._id));
      }
  }
  else{
    contactList = [createContactData()];
  }
  localStorage.setItem("ContactList",JSON.stringify(contactList));
}

const createContactData = (id) => {
  let contactData = new Contact();
  if(!id)
  contactData.id = createNewContactId();
  else
  contactData.id = id;
  setContactData(contactData);
  return contactData;
}

const createNewContactId = () => {
  let cntID = localStorage.getItem("ContactID");
  cntID = !cntID ? 1 : (parseInt(cntID)+1).toString();
  localStorage.setItem("ContactID",cntID);
  return cntID;
}

const setContactData = (contactData) => {
  try{
    contactData.firstName = contactObject._firstName;
  }catch(e){
      setTextValue('.name-error',e);
  }

  try{
    contactData.lastName = contactObject._lastName;
  }catch(e){
      setTextValue('.name-error',e);
  }

  try{
    contactData.address = contactObject._address;
  }catch(e){
      setTextValue('.address-error',e);
  }

  contactData.city = contactObject._city;
  contactData.state = contactObject._state;
  contactData.zip = contactObject._zip;

  try{
    contactData.phone = contactObject._phone;
  }catch(e){
      setTextValue('.phone-error',e);
  }

  alert(contactData.toString());
}
