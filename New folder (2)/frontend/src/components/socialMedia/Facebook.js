import FacebookLogin from "react-facebook-login"


function Facebook(){
    
    return(
        <FacebookLogin 
            appId="1088597931155576"
            autoLoad={true}
            fields="name,email,picture"
            onClick={componentClicked}
            callback={responseFacebook}
        />
    )
}

export default Facebook;