const generateEmpNumber=(length=10)=>{
    let EmpNum = '';
    for (let i = 0; i < length; i++) {
        EmpNum += Math.floor(Math.random() * 10); // 0-9
    }
    return EmpNum;
}



export default generateEmpNumber