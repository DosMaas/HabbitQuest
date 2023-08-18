import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from '@mui/material/Checkbox';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import {
  GridRowModes,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';



function DailyPage() {
  const dailyHabits = useSelector(store => store.daily);
  const habits = useSelector(store => store.habit.habitList);
  const dispatch = useDispatch();
  const [rows, setRows] = useState(dailyHabits);
  const [rowModesModel, setRowModesModel] = useState({});
  const [selectedRow, setSelectedRow] = useState({});


  // console.log('Ryan Here DailyPage \n', { dailyHabits, habits, rows, rowModesModel, GridRowModes });

  function handleRowEditStop(params, event) {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
      const id = dailyHabits.id;
      setRows((oldRows) => [...oldRows, { id, name: '', isNew: true }]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
      }));
    };

    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add Habbit
        </Button>
      </GridToolbarContainer>
    );
  }


  // ⬇ Will toggle the view state of the row from View to Edit: 
  function handleEditClick(id) {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  }; // End handleEditClick

  // ⬇ Will toggle the view state of the row from Edit to View:
  function handleSaveClick(id) {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  }; // End handleSaveClick

  // ⬇ Will delete the row from the database and refresh the data:
  function handleDeleteClick(id) {
    if (!window.confirm('Are you sure you want to delete this habit?')) return;
    dispatch({ type: 'DELETE_HABIT', payload: id })
  }; // End handleDeleteClick

  function handleCancelClick(id) {
    console.log(`Ryan Here:  handleCancelClick \n `, { id });
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    // const editedRow = rows.find((row) => row.id === id);
    // if (editedRow.isNew) {
    //   setRows(rows.filter((row) => row.id !== id));
    // }
  };

  // ⬇ Will submit the row's changed after editing: 
  function processRowUpdate(updatedRow) {
    dispatch({ type: 'EDIT_HABIT', payload: updatedRow })
    return updatedRow;
  }; // End processRowUpdate

  // ⬇ Tracks which rows are in edit mode by ID:
  function handleRowModesModelChange(newRowModesModel) {
    setRowModesModel(newRowModesModel);
  }; // End handleRowModesModelChange



  useEffect(() => {
    dispatch({ type: 'FETCH_DAILY_HABITS' })
  }, []);

  // const d = new Date();
  // let day = d.getDay();

  function handleEdit(params) {

  }

  function handleComplete(params) {
    dispatch({ type: 'COMPLETE_HABIT', payload: params.row })
  }

  // function handleDelete(params) {
  //   if (!window.confirm('Are you sure you want to delete this habit?')) return;
  //   dispatch({ type: 'DELETE_HABIT', payload: params.row })
  // }

  const columns = [
    {
      field: 'Complete',
      headerName: '',
      flex: .75,
      align: 'center',
      renderCell: (params) => {
        return (
          <div onClick={() => handleComplete(params)}>
            {!params.row.complete
              ? <CheckIcon sx={{ color: 'green' }} />
              : <DoDisturbOnIcon sx={{ color: 'red' }} />
            }
          </div>
        )
      }
    },
    {
      field: 'name',
      headerName: 'My Habits',
      flex: 3,
      editable: true,
    },

    // {
    //   field: 'Edit',
    //   headerName: '',
    //   flex: 1,
    //   // deleteButton: true,
    //   renderCell: (params) => {
    //     return (
    //       <Button
    //         onClick={() => handleEdit(params)}>
    //         Edit
    //       </Button>
    //     )
    //   }
    // },
    // {
    //   field: 'Delete',
    //   headerName: '',
    //   flex: 1,
    //   // deleteButton: true,
    //   renderCell: (params) => {
    //     return (
    //       <Button
    //         onClick={() => handleDelete(params)}>
    //         Delete
    //       </Button>
    //     )
    //   }
    // },

    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      // width: 1,
      flex: 1,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label='Save'
              // sx={{ color: 'blue' }}
              onClick={() => handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              sx={{ color: 'red' }}
              onClick={() => handleCancelClick(id)}
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label='Edit'
            // sx={{ color: 'blue' }}
            onClick={() => handleEditClick(id)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label='Delete'
            sx={{ color: 'red' }}
            onClick={() => handleDeleteClick(id)}
          />
        ]
      }
    }
  ]; // End columns

  // console.log('Ryan Here: selectRow \n', { selectedRow });



  return (
    <div>
      <h1>Day of The Week Placeholder</h1>
      <div style={{ height: 400, width: '100%' }}>

        <Box
          sx={{
            height: 500,
            width: '100%',
            '& .actions': {
              color: 'text.secondary',
            },
            '& .textPrimary': {
              color: 'text.primary',
            },
          }}
        >
          <DataGrid
            rows={dailyHabits}
            columns={columns}
            editMode='row'
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={(error) => console.error({ error })}
            slots={{
              toolbar: EditToolbar,
            }}
            slotProps={{
              toolbar: { setRows, setRowModesModel },
            }}
            rowSelectionModel={selectedRow?.id}
            onRowSelectionModelChange={rowId => {
              const foundRow = dailyHabits.find((row) => row.id == rowId);
              setSelectedRow(foundRow);
            }}
          />
        </Box>
      </div>


    </div>
  )
};

export default DailyPage;