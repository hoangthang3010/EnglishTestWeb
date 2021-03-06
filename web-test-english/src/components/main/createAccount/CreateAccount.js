import React, { useEffect, useState } from 'react'
import './CreateAccount.scss'
import { Radio } from 'antd';
import axios from 'axios'
import questionsApi from '../../../api/questionApi'

// const axios = require('axios');
function CreateAccount({history}){
    const [email, setEmail] = useState({text : '', err : false, err1: false, err2:false});
    const [firtname, setFirtName] = useState({text : '', err : false});
    const [name, setName] = useState({text : '',err : false});
    const [phonenumber, setPhoneNumber] = useState({text : '',err : false});
    const [password, setPassword] = useState({text : '',err : false});
    const [repassword, setRePassWord] = useState({text : '',err : false, err1: false});
    const [username, setUsername] = useState({text : '',err : false,  err1: false});
    const [sex, setSex] = useState(0)
    const [birthday, setBirthday] = useState('')
    const [dupUsername, setDupUsername] =useState('')
    const [dupEmail, setDupEmail] =useState('')
    const [member, setMember] = useState('');
    const role = 'user'
    // const emailValidator =  /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
    // /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    const emailValidator = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
    const phoneValidator= /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    const fetchAccountApi = async () => {
        const response = await questionsApi.fetchAccountApi()
        setMember(response)
        console.log(response)
      }
    useEffect(() => {
        fetchAccountApi()
    }, [])
    const onCreateMember = (e) =>{
        var isErr = false;
        var d = new Date( document.getElementById("dt").value);
        var o = new Date()
        // || email.text !== /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/
        if(username.text === ''){isErr = true; setUsername({err: true})}
        if(password.text === '') {isErr = true; setPassword({err: true})} 
        if(email.text === ''){isErr = true; setEmail({err: true})} 
        if(!emailValidator.test(email.text) && email.text !== ''){isErr = true; setEmail({err1: true})} 
        if(firtname.text === ''){isErr = true; setFirtName({err: true})} 
        if(name.text === ''){isErr = true;setName({err: true})} 
        if(repassword.text === ''){isErr = true; setRePassWord({err: true})} 
        if(password.text != repassword.text && repassword.text !== ''){isErr = true; setRePassWord({err1: true})} 
        // if(sex ===''){isErr = true; setSex({err: true})} 
        if(phonenumber.text === ''){isErr = true;setPhoneNumber({err: true})}
        if(!phoneValidator.test(phonenumber.text) && phonenumber.text !== ''){isErr = true;setPhoneNumber({err1: true})}
        if(!d.getDate() || !d.getMonth() || !d.getFullYear()){isErr = true; setBirthday({err: true})}
        // if(username.text === member[dupUsername].username){isErr = true; setUsername({err1: true})}
        // if(email.text === member[dupEmail].email){isErr = true; setEmail({err2: true})}
        for(let i= 0; i< member.length ; i++){
            if(email.text === member[i].email ){
                // return setDupEmail(i)
                isErr = true; setEmail({err2: true})
            }
            if(username.text === member[i].username ){
                // setDupUsername(i)
                isErr = true; setUsername({err1: true})
            }
        }
        const customerSignUp ={
            role: `${role}`,
            username: `${username.text}`,
            password: `${password.text}`,
            email: `${email.text}`,
            fullname: `${firtname.text} ${name.text}`,
            sex: `${sex}`,
            phonenumber: `${phonenumber.text}`,
            birthday: `0${d.getDate()}`.slice(-2) +'/'+ `0${d.getMonth()}`.slice(-2) +'/'+`${d.getFullYear()}`,
            old: `${o.getFullYear() - d.getFullYear()}`
        }
        e.preventDefault();
        if  (!isErr){
            axios.post('http://localhost:3004/account', customerSignUp)
            .then(function (response) {
                history.push("/user")
            })
            .catch(function (error) {
                console.log(error)
            })
            alert('T???o t??i kho???n th??nh c??ng')
        }else{
            
        } 
    }
    const onHandleClear = () =>{
        console.log('hi');
        setUsername({text : '',});
        setEmail({text : '',});
        setFirtName({text : '',});
        setName({text : '',});
        setPhoneNumber({text : '',});
        setPassword({text : '',});
        setRePassWord({text : '',});
        setPhoneNumber({text : '',})
        setSex(0)
        setBirthday('')
        document.getElementById("formDK").reset()
    }
    const onChangeSex = (e) =>{
        setSex(e.target.value);
    }
    const onHandleEmail = e =>{
        setEmail({text : e.target.value})
    }
    const onHandleFirtName = e =>{
        setFirtName({text : e.target.value})
    }
    const onHandleName = e =>{
        setName({text : e.target.value})
    }
    const onHandleUsername = e =>{
        setUsername({text : e.target.value})
    }
    const onHandlePhoneNumber = e =>{
        setPhoneNumber({text : e.target.value})
    }
    const onHandlePassword = e =>{
        setPassword({text : e.target.value})
    }
    const onHandleRePassword = e =>{
        setRePassWord({text : e.target.value})
    }
    const onHandleDate = () => {
        // setRePassWord('')
    }
    return (
        <div className="creaccount">
            <div className="creaccount__body">
            <form onSubmit = {onCreateMember} id="formDK">
                    <h2>????ng k?? th??nh vi??n</h2>
                    <div className="creaccount__body__note">????? ????ng k?? th??nh vi??n, b???n c???n khai b??o t???t c??? c??c ?? tr???ng d?????i ????y</div>
                    {/* <div> */}
                        <span type='radio'>H??? v?? t??n ?????m:</span>
                        <input type='value' placeholder="Nh???p h??? v?? t??n ?????m"
                            value={firtname.text}
                            onChange={onHandleFirtName}>
                        </input>
                    {/* </div> */}
                    {firtname.err && <div className='creaccount__body__arrShow'>Nh???p h??? v?? t??n ?????m</div>}
                    {/* <div> */}
                        <span type='radio'>T??n:</span>
                        <input type='value' placeholder="Nh???p t??n"
                            value={name.text}
                            onChange={onHandleName}>
                        </input>
                    {/* </div> */}
                    {name.err && <div className='creaccount__body__arrShow'>Nh???p t??n</div>}
                    {/* <div> */}
                        <span type='radio'>T??n ????ng nh???p:</span>
                        <input type='value' placeholder="Nh???p t??n ????ng nh???p"
                            value={username.text}
                            onChange={onHandleUsername}>
                        </input>
                    {/* </div> */}
                    {username.err && <div className='creaccount__body__arrShow'>Nh???p t??n ????ng nh???p</div>}
                    {username.err1 && <div className='creaccount__body__arrShow'>T??n ????ng nh???p ???? t???n t???i</div>}
                    <div className= "creaccount__body__sex">
                        <span type='radio'>Gi???i t??nh:</span>
                        <div className="creaccount__body__sex__seperate">
                            <Radio.Group className="creaccount__body__sex__seperate__radio" value={sex} onChange={onChangeSex}>
                                <Radio value={0}><label>Nam</label></Radio>
                                <Radio value={1}><label>N???</label></Radio>
                                <Radio value={2}><label>Kh??c</label></Radio>
                            </Radio.Group>
                        </div>
                    </div>
                    {/* {sex.err && <div className='creaccount__body__arrShow'>Ch???n gi???i t??nh</div>} */}
                    <div className= "creaccount__body__birthday">
                        <span type='radio1'>Ng??y sinh:</span>
                        <input type="date" id="dt" title="Nh???p ng??y sinh" onChange={onHandleDate}/>
                    </div>
                    {birthday.err && <div className='creaccount__body__arrShow'>Nh???p ng??y sinh</div>}  
                    <span type='radio'>Email:</span>
                    <input type='value' placeholder="Nh???p email"
                        value={email.text}
                        onChange={onHandleEmail}>
                    </input>
                    {email.err && <div className='creaccount__body__arrShow'>Nh???p email</div>}
                    {email.err1 && <div className='creaccount__body__arrShow'>Email sai ?????nh d???ng</div>}
                    {email.err2 && <div className='creaccount__body__arrShow'>Email ???? t???n t???i</div>}
                    <span type='radio'>S??? ??i???n tho???i:</span>
                    <input type='value' placeholder="Nh???p s??? ??i???n tho???i"
                        value={phonenumber.text}
                        onChange={onHandlePhoneNumber}>
                    </input>
                    {phonenumber.err1 && <div className='creaccount__body__arrShow'>S??? ??i???n tho???i sai ?????nh d???ng</div>}
                    {phonenumber.err && <div className='creaccount__body__arrShow'>Nh???p s??? ??i???n tho???i</div>}
                    <span type='radio'>M???t kh???u:</span>
                    <input type='value' placeholder="Nh???p m???t kh???u"
                        value={password.text}
                        onChange={onHandlePassword}>
                    </input>
                    {password.err && <div className='creaccount__body__arrShow'>Nh???p m???t kh???u</div>}
                    <span type='radio'>Nh???p l???i m???t kh???u:</span>
                    <input type='value' placeholder="Nh???p l???i m???t kh???u"
                        value={repassword.text}
                        onChange={onHandleRePassword}>
                    </input>
                    {repassword.err && <div className='creaccount__body__arrShow'>Nh???p l???i m???t kh???u</div>}
                    {repassword.err1 && <div className='creaccount__body__arrShow'>M???t kh???u kh??ng kh???p</div>}
                    <div className="creaccount__body__action">
                        <div className="creaccount__body__action__c">
                           
                                <button type="submit" className="btn btn-warning">
                                    <span><i className="fas fa-plus-square"></i></span>
                                    &nbsp;L??u L???i
                                </button>
                                &nbsp;
                                {/* <button className="btn btn-danger">
                                    <span><i className="fas fa-window-close " onClick={onHandleClear}></i> </span>
                                    H???y B???
                                </button> */}
                                <button type="button" className="btn btn-danger" onClick = {onHandleClear}>
                                    <i className="fas fa-window-close "/>&nbsp;H???y b???</button>
                            
                        </div>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default CreateAccount;
{/* <Radio.Group onChange={onChangeSex}>
                            <Radio value='male'>Nam</Radio>
                            {/* <label>Nam</label> */}
                            // <Radio value='female'>N???</Radio>
                            {/* <label>N???</label> */}
                        // </Radio.Group> 