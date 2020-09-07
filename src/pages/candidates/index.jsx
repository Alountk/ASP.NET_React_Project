import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as A from "./store/candidates.action";

import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import DCandidatesForm from "../../components/dCandidatesForm/DCandidatesForm";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useToasts } from "react-toast-notifications";

const styles = theme =>({
  root:{
    "& .MuiTableCell-head": {
      fontSize: '1.25rem'
    }
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2)
  }
})

const Candidates = ({classes, ...props}) => {
  const [currentId, setCurrentId] = useState(0);
  const { candidatesList } = useSelector((state) => state.candidates);
  const dispatch = useDispatch();
  const { addToast } = useToasts()


  useEffect(() => {
    dispatch(A.getListCandidatesRequest());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidatesList]);

  const onDelete = id => {
    if(window.confirm("Are you sure to delete this record?")){
      dispatch(A.deleteCandidateRequest(id));
      addToast("Deleted successfully", { appearance: 'info' });
    }
  }
  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid container>
        <Grid item xs={6}>
          <DCandidatesForm {...({currentId,setCurrentId,candidatesList})}/>
        </Grid>
        <Grid item xs={6}>
          <TableContainer>
            <Table>
              <TableHead className={classes.root}>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>Blood Group</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {candidatesList.map((can,i) => {
                  return(
                    <TableRow key={i} hover>
                      <TableCell>{can.fullName}</TableCell>
                      <TableCell>{can.mobile}</TableCell>
                      <TableCell>{can.bloodGroup}</TableCell>
                      <TableCell>
                        <ButtonGroup
                        variant="text">
                          <Button>
                            <EditIcon color="primary"
                              onClick={() =>{setCurrentId(can.id)}}
                            />
                          </Button>
                          <Button>
                            <DeleteIcon color="secondary"
                              onClick={() => onDelete(can.id)}
                            />
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default withStyles(styles)(Candidates);