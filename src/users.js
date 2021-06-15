// import React, { Component } from 'react'
// import {connect} from 'react-redux'
// import {getUsers} from './redux/actions/moviesActions'

//  class users extends Component {
//     componentDidMount(){
//         this.props.getUsers()
//     }
//     render() {
//         const {users} = this.props.users
//         console.log(this.props.users)
//         return (
//             <div>
//                 {users.map(u => 
//                      <React.Fragment key={u.id}>
//                          <h6 >{u.backdrop_path}</h6> 
//                      </React.Fragment>
//                 )}
//             </div>
//         )
//     }
// }

// const mapStateToProps  = (state) => ({users:state.users})

// export default connect(mapStateToProps, {getUsers})(users)