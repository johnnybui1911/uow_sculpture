import { SIGN_IN_SUCCESSFULL, SIGN_IN_REJECTED } from '../../assets/actionTypes'

const initialState = {
  loggedIn: false,
  user: {
    userId: 'hnb133',
    username: 'Cristiano Ronaldo',
    email: 'cristiano@gmail.com',
    joinDate: new Date('October 13, 2014'),
    likes: 3,
    comments: 4,
    visited: 3
  },
  likeList: {
    1986.058: true,
    1987.08: true,
    1987.081: true
  },
  commentList: {
    1986.058: {
      sculptureId: 1986.058,
      text: 'Hello',
      submitDate: new Date(2019, 5, 24, 10, 33, 30)
    },
    1987.08: {
      sculptureId: 1987.08,
      text:
        'One of the best sculpture I have ever seen. Highly recommended for new visitors to Wollongong.',
      submitDate: new Date(2019, 5, 29, 10, 33, 30)
    },
    1987.081: {
      sculptureId: 1987.081,
      text:
        'One of the best sculpture I have ever seen. Highly recommended for new visitors to Wollongong.',
      submitDate: new Date()
    }
  }
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESSFULL: {
      return { ...state, loggedIn: true }
    }
    case SIGN_IN_REJECTED: {
      return { ...state, loggedIn: false }
    }
    default:
      return state
  }
}

export default authReducer
