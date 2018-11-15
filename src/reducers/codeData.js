const codeData = (state = {count:4,moNo: "C01201705220036"}, action) => {
  switch (action.type) {
    case 'GET_CODE_DATA':
      return action.arr
    default:
      return state
  }
}

export default codeData