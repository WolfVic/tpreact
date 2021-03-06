// eslint-disable-next-line
import React, {Component} from 'react'
// eslint-disable-next-line
import { auth, provider } from '../firebase/firebase.js'
// eslint-disable-next-line
import Typography from '@material-ui/core/Typography'
// eslint-disable-next-line
import Paper from '@material-ui/core/Paper'
// eslint-disable-next-line
import Button from '@material-ui/core/Button'
// eslint-disable-next-line
import { Redirect } from 'react-router-dom'

/* <div className={classes.margin}>
      <Typography variant="title">Vous êtes déjà connecter</Typography>
      <Link to='Profile'><Button variant='contained' color='secondary' >Vers profile</Button></Link>
    </div> */
export default class Auth extends Component {
  render () {
    const classes = this.props.classes
    return (
      <div className={classes.appFrame}>
        <div className={classes.content}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Paper style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
              {
                this.props.user !== null
                  ? <Redirect to='/Bienvenue' />
                  : <div className={classes.margin}>
                    <Typography variant='h6'>Connexion:</Typography>
                    <Connexion connexion={this.props.connexion} />
                    <Typography variant='caption'>Bientôt disponible: Facebook et email ;D</Typography>
                  </div>
              }
            </Paper>
          </div>
        </div>
      </div>
    )
  }
}

// eslint-disable-next-line
function Connexion (props) {
  return (
    <div>
      <Paper style={{margin: '1em'}}>
        <Button variant='flat' onClick={props.connexion}>
          <img alt='G' style={{height: '18px', width: '18px', marginRight: '0.5em'}} src='https://firebasestorage.googleapis.com/v0/b/tpneerandais.appspot.com/o/pictures%2Fgoogle.svg?alt=media&token=4545610a-4edd-46f0-bd18-e2522f488902' />
          Se connecter avec Google
        </Button>
      </Paper>
    </div>
  )
}
