// eslint-disable-next-line
import React, {Component} from 'react'
// eslint-disable-next-line
import TableCell from '@material-ui/core/TableCell'
import TextField from '@material-ui/core/TextField'

export default class Cell extends Component {
  render () {
    function verification (e) {
      var reponse = e.target.value
      var regex = /\s?(\()\s?/
      var valueClean = reponse.split(regex)
      var index = e.target.id
      var correct = reponse !== '' ? reponse === valueClean[0] : 'neutre'
      console.log('valueClean', valueClean[0])
      console.log('correct', correct)
      handleReponse(correct, index, colonne.value)
    }
    const classes = this.props.classes
    var index = this.props.index
    var id = this.props.value.id
    var colonne = this.props.colonne
    var value = this.props.value[colonne.value]
    var handleReponse = this.props.handleReponse
    var correct = this.props.value['correct'][colonne.value]
    if (this.props.type === 'test') {
      if (this.props.nbAleatoireQuestion[index].indexOf(this.props.nb) !== -1) {
        return (
          <TableCell key={id + colonne.value} className={this.props.affCor ? correct === true ? classes.success : correct === false ? classes.danger : '' : ''} style={{'display': colonne.afficher ? 'table-cell' : 'none'}}> <TextField label='Réponse' id={String(index)} tag='question' InputProps={{classes: {input: classes.textInput}}} className='search-input' type='text' onBlur={(e) => verification(e)} /> <span style={{display: (this.props.affRep && correct !== true) ? 'flex' : 'none', fontSize: '16px'}}>{value}</span></TableCell>
        )
      } else {
        return (
          <TableCell key={id + colonne.value} style={{'display': colonne.afficher ? 'table-cell' : 'none', fontSize: '16px'}}> {value} </TableCell>
        )
      }
    } else {
      if (colonne.question === true) {
        return (
          <TableCell key={id + colonne.value} className={this.props.affCor ? correct === true ? classes.success : correct === false ? classes.danger : '' : ''} style={{'display': colonne.afficher ? 'table-cell' : 'none'}}> <TextField id={String(index)} tag='question' type='text' label='Réponse' onBlur={(e) => verification(e)} /> <span style={{display: (this.props.affRep && correct !== true) ? 'flex' : 'none', fontSize: '16px'}}>{value}</span> </TableCell>
        )
      } else {
        return (
          <TableCell key={id + colonne.value} style={{'display': colonne.afficher ? 'table-cell' : 'none', fontSize: '16px'}}> {value} </TableCell>
        )
      }
    }
  }
}
