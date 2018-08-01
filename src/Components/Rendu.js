/*eslint-disable */
import React, {Component} from 'react'
import options from '../config/options'
// import {Paper, Table, TableHead, TableRow, TableCell, FormControl, InputLabel, Switch as Switch, TableBody, Grid, Typography} from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Switch from '@material-ui/core/Switch'
import TableBody from '@material-ui/core/TableBody'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Row from './Row'
/*eslint-enable */
export default class Rendu extends Component {
  render () {
    const classes = this.props.classes
    var tp = this.props.tp
    var limite = this.props.limite
    var colonne = this.props.colonne
    var nombre = [0, 1, 2, 3]
    var handleQuestion = this.props.handleQuestion
    var handleReponse = this.props.handleReponse
    var afficherReponse = this.props.afficherReponse
    var selectionPage = this.props.selectionPage
    var tpAfficher = this.props.tpAfficher
    var handleCheck = this.props.handleCheck
    var aleatoireQuestion = this.props.aleatoireQuestion
    var nbAleatoireQuestion = this.props.nbAleatoireQuestion
    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table} >
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                {
                  nombre.map((nb) =>
                    <TableCell key= {'th' + nb} style={{'display': colonne[nb].afficher ? 'table-cell' : 'none'}}>
                      <div>
                        <div className={classes.gridRoot}>
                          <Grid container>
                            <Grid item >
                              <div className={classes.gridHeader}>
                                <Typography variant="title"> {options[nb].label} </Typography>
                              </div>
                            </Grid>
                            <Grid item>
                              <div className={classes.gridHeader}>
                                {
                                  aleatoireQuestion
                                    ? ''
                                    : (
                                      <FormControl>
                                        <InputLabel htmlFor={'col' + nb} shrink>Question</InputLabel>
                                        <Switch inputProps={{ id: 'col' + nb }} onChange={handleQuestion} checked={colonne[nb].question} classes={{checked: classes.checked, bar: classes.bar}}/>
                                      </FormControl>
                                    )
                                }
                              </div>
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                    </TableCell>
                  )
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                tp !== undefined
                  ? tp.filter(tpAfficher => tpAfficher.afficher)
                    .map(function (listValue, index) {
                      if (index < limite) {
                        return (
                          <Row key = {'row' + index}
                            index = {index}
                            listValue = {listValue}
                            colonne = {colonne}
                            handleReponse = {handleReponse}
                            afficherReponse = {afficherReponse}
                            selectionPage = {selectionPage}
                            tpAfficher = {tpAfficher}
                            handleCheck = {handleCheck}
                            aleatoireQuestion = {aleatoireQuestion}
                            nbAleatoireQuestion = {nbAleatoireQuestion}
                            classes = {classes}
                          />
                        )
                      } else {
                        return null
                      }
                    })
                  : ''
              }
            </TableBody>
          </Table>
        </Paper>

      </div>
    )
  }
}
