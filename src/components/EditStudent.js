import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const EditStudent = (props) => {
  const { student, editStudent } = props;

  const [open, setOpen] = useState(false);
  const [student_id, setStudent_id] = useState(student.student_id);
  const [student_name, setStudent_name] = useState(student.name);
  const [student_email, setStudent_email] = useState(student.email);
  const [statusCode, setStatusCode] = useState(student.statusCode);
  const [status, setStatus] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "student_id") {
      setStudent_id(value);
    } else if (name === "student_name") {
      setStudent_name(value);
    } else if (name === "student_email") {
      setStudent_email(value);
    } else if (name === "statusCode") {
      setStatusCode(value);
    } else if (name === "status") {
      setStatus(value);
    }
  };

  const handleUpdate = () => {
    editStudent(student_id, student_name, student_email, statusCode, status);
    handleClose();
  };

  return (
    <div>
      <Button id="updateStudent" type="button" margin="auto" onClick={handleClickOpen}>
        Update
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Student</DialogTitle>
        <DialogContent style={{ paddingTop: 20 }}>
          <TextField id="studentName" autoFocus fullWidth label="Student Name" name="student_name" onChange={handleChange} />
          <TextField id="studentEmail" autoFocus fullWidth label="Student Email" name="student_email" onChange={handleChange} />
          <TextField id="statusCode" autoFocus fullWidth label="Status Code" name="statusCode" onChange={handleChange} />
          <TextField id="status" autoFocus fullWidth label="Student Status" name="status" onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>Cancel</Button>
          <Button id="update" color="primary" onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

EditStudent.propTypes = {
  student: PropTypes.object.isRequired,
  editStudent: PropTypes.func.isRequired
};

export default EditStudent;
