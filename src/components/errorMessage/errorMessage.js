import errorImg from './error.gif'
const ErrorMessage = () => {
    return (
        <img src={errorImg} alt='error-img' style={{width:'200px', height: '200px', margin: '20px auto', display: 'block'}}/>
    )
}

export default ErrorMessage;