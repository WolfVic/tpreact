import React, { Component } from 'react'
import { db } from '../firebase/firebase'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import Send from '@material-ui/icons/Send'
import CircularProgress from '@material-ui/core/CircularProgress'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Switch from '@material-ui/core/Switch'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import {Redirect} from 'react-router-dom'

class AddAlert extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tokenAdd:'',
      toSave:false,
      redirect: false,
      nameAdd: '',
      errorNameAdd: false
    }
    this.addList = this.addList.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.tokenSwitch = this.tokenSwitch.bind(this)
  }

  handleChange = name => event => {
    const value = event.target.value
    //const name = e.target.id
    this.setState({[name]: value})
  }

  async addList () {
    this.setState({loading: true})
    const saveList = (list) => {
      const doc = db
            .collection('users').doc(this.props.user.uid).collection('lists')
            .doc()
            return doc
            .set({id: doc.id, name: this.state.nameAdd, tps: list.tps, token: token, private: false, lang: list.lang})
    }
    const token = this.state.tokenAdd
    const save = this.state.toSave
    let msgSnackbar = ''
    // eslint-disable-next-line
    let header = new Headers()
    header.append('Content-Type', 'application/x-www-form-urlencoded')
    const url = 'https://europe-west1-tpneerandais.cloudfunctions.net/addListWithCode'
    let body = 'token=' + token
    if (token.length !== 5) {
      console.error('Erreur, taille token incorrect')
      msgSnackbar = 'Erreur, taille token incorrect'
      this.setState({msgSnackbar: msgSnackbar, openSnackbar: true, addAlert: true, loading: false, errorTokenAdd: true})
    } else if (save && this.state.nameAdd.length === 0) {
      console.error('Erreur, Nom de la liste incorrect')
      msgSnackbar = 'Erreur, Nom de la liste vide'
      this.setState({msgSnackbar: msgSnackbar, openSnackbar: true, addAlert: true, loading: false, errorNameAdd: true})
    } else {
      try {
        let list
        const res = await fetch (url, {
          method: 'post',
          headers: header,
          body: body,
          mode: 'cors'
        })
        if (res.ok) {
          const result = await res.json()
          list = {
            lang: result.lang,
            tps: result.tps
          }
          msgSnackbar = 'Liste importée avec succès'
          if (save) {
            await saveList(list)
            msgSnackbar += ' et sauvegardé avec succès!'
          }
        } else {
          let error = await res.text()
          throw new Error('serveur: '+ error)
        }
        this.props.setListWithToken(list).then(() => this.setState({nameAdd: '', tokenAdd: '', msgSnackbar: msgSnackbar, openSnackbar: true, toSave: false, addAlert: false, loading: false, redirect: true, errorNameAdd: false, errorTokenAdd: false}))
        this.props.closeAddAlert()
      } catch (e) {
        console.error('Erreur', e)
        msgSnackbar = String(e)
        this.setState({nameAdd: '', tokenAdd: '', msgSnackbar: msgSnackbar, openSnackbar: true, toSave: false, addAlert: true, loading: false, redirect: false, errorNameAdd: false, errorTokenAdd: false})
      }

      // eslint-disable-next-line
      /* const req = new XMLHttpRequest()
      req.open('POST', url)
      // req.responseType = 'json'
      req.onload = () => {
        const body = req.response
        if (req.status === 200) {
          console.log('réponse recue: %s', req.responseType)
        } else {
          console.log('Status de la réponse %d (%s)', req.status, req.statusText)
        }
        try {
          if (req.status === 500) {
            throw new Error('Erreur serveur %d (%s)', res.status, res.statusText)
          }
          let result = JSON.parse(body)
          let list = {
            lang: result.lang,
            tps: result.tps
          }
          msgSnackbar = 'Liste importée avec succès'
          if (save) {
            const doc = db
            .collection('users').doc(this.props.user.uid).collection('lists')
            .doc()
            doc
            .set({id: doc.id, name: this.state.nameAdd, tps: list.tps, token: token, private: false, lang: list.lang})
            .then(() => {
              msgSnackbar += ' et enregistré avec succès !'
            })
            .catch(e => {
              console.error('Erreur save: ', e)
              throw new Error('Erreur save, ' + e)
            })
          }
          this.props.setListWithToken(result).then(() => this.setState({nameAdd: '', tokenAdd: '', msgSnackbar: msgSnackbar, openSnackbar: true, toSave: false, addAlert: false, loading: false, redirect: true, errorNameAdd: false, errorTokenAdd: false}))
          this.props.closeAddAlert()
          return list
        } catch (e) {
          msgSnackbar = e.message
          console.error('Erreur request: ', e.message)
          this.setState({msgSnackbar: msgSnackbar, openSnackbar: true, addAlert: true, loading: false})
          return e
        }
      }
      req.send() */
    }
  }

  tokenSwitch () {
    this.setState({toSave: !this.state.toSave})
  }

  render () {
    const classes = this.props.classes
    return (
      <div>
      {this.state.redirect
        ? <Redirect to={{pathname:'/Liste', state:{}}} />
        : null
      }
      <Dialog
        fullScreen={this.props.fullScreen}
        open={this.props.open}
        onClose={this.closeAddAlert}
        scroll='body'
      >
        <DialogTitle>Ajout liste avec code</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ajoute une liste correspondant à un code de 5 caractères et l'enregistre si besoin
          </DialogContentText>
          <div className={classes.gridRoot}>
            <Grid container spacing={32} alignItems='baseline' justify='flex-start'>
              <Grid item>
                <FormControl style={{width: '5em'}}>
                  <TextField
                    error={this.state.errorTokenAdd}
                    id='tokenAdd'
                    label='Token'
                    value={this.state.tokenAdd}
                    onChange={this.handleChange('tokenAdd')}
                    margin='normal'
                    autoFocus={this.props.open}
                  />
                  <FormHelperText>Code de 5 caractères d'une liste</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl>
                  <InputLabel htmlFor='tokenSaveSwitch' shrink>Enregistrer</InputLabel>
                  <Switch onClick={this.tokenSwitch} id='tokenSaveSwitch' classes={{checked: classes.checked, bar: classes.bar}} checked={this.state.toSave} disabled={!this.props.user} />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl>
                  <TextField error={this.state.errorNameAdd} id='nameAdd' label='Nom liste' onChange={this.handleChange('nameAdd')} disabled={!(this.state.toSave && this.props.user)} />
                  <FormHelperText style={{display: !this.props.user ? 'flex' : 'none'}}>Connection requise</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <div style={{position: 'relative'}}>
            <Button onClick={this.addList} color='secondary'>Valider <Send className={classes.rightIcon} /></Button>
            {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
          <Button onClick={this.props.closeAddAlert} color='primary' autoFocus>
          Fermer
          </Button>
        </DialogActions>
      </Dialog>
        <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            open={this.state.openSnackbar}
            autoHideDuration={6000}
            onClose={() => this.setState({openSnackbar: false, errorNameAdd: false, errorTokenAdd: false})}
            ContentProps={{
              'aria-describedby': 'Liste enregistré'
            }}
            message={<span id={this.state.msgSnackbar}>{this.state.msgSnackbar} </span>}
            action={[
              <IconButton
                key='close'
                aria-label='Close'
                color='inherit'
                className={classes.close}
                onClick={() => this.setState({openSnackbar: false, errorNameAdd: false, errorTokenAdd: false})}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
        </div>
    )
  }
}

export default withMobileDialog()(AddAlert)
