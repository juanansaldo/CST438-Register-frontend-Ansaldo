import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const AddStudent = (props) => {
  const [open, setOpen] = useState(false);
  const [student_name, setStudent_name] = useState("John Doe");
  const [student_email, setStudent_email] = useState("johndoe@gmail.com");

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    if (event.target.name === "student_name") {
      setStudent_name(event.target.value);
    } else if (event.target.name === "student_email") {
      setStudent_email(event.target.value);
    }
  };

  const handleAdd = () => {
    props.addStudent(student_name, student_email);
    handleClose();
  }

  return (
    <div>
      <Button id="addStudent" variant="outlined" color="primary" style={{ margin: 10 }} onClick={handleClickOpen}>
        Add Student
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent style={{ paddingTop: 20 }}>
          <TextField id="studentName" autoFocus fullWidth label="Student Name" name="student_name" onChange={handleChange} />
          <TextField id="studentEmail" autoFocus fullWidth label="Student Email" name="student_email" onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>Cancel</Button>
          <Button id="add" color="primary" onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

AddStudent.propTypes = {
  addStudent: PropTypes.func.isRequired
}

export default AddStudent;
