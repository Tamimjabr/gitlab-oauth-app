/**
 * The ActivitiesTable component is a table that displays the activities
 *
 * @author Tamim Jabr
 * @version 1.0.0
 */
import * as React from 'react'
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridColDef,
} from '@mui/x-data-grid'
import useMediaQuery from '@mui/material/useMediaQuery';
import { GitlabUserEvent } from '../intergrations/gitlab-user-info'


const columns: GridColDef[] = [
  { field: "created_at", headerName: "Created At", width: 250 },
  {
    field: 'author', headerName: "Author", width: 180, valueGetter: (params: {
      value: {
        username: string
      }
    }) => params.value?.username
  },
  { field: "action_name", headerName: "Action Name", width: 150 },
  { field: "target_type", headerName: "Target Type", width: 150 },
  { field: "target_title", headerName: "Target Title", width: 300 },
  {
    field: 'push_data', headerName: "Commit Title", width: 500, valueGetter: (params: {
      value: {
        commit_title?: string
      }
    }) => params.value?.commit_title
  },
]

function CustomToolbar () {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  )
}

export default function ActivitiesTable ({ rows }: { rows: GitlabUserEvent[] }) {
  const smallScreen = useMediaQuery('(max-width:700px)');
  return (
    <div style={{ height: 500, width: `${smallScreen ? '100%' : '80%'}`, margin: '1rem auto', backgroundColor: 'white' }}>
      <DataGrid
        rows={rows} columns={columns}
        components={{
          Toolbar: CustomToolbar,
        }}
        sx={{
          '& 	.MuiDataGrid-row:nth-child(even)': { backgroundColor: '#e7e7e7' },
          '& .MuiDataGrid-cell': {
            overflow: 'auto',
            overflowWrap: 'break-word',
            whiteSpace: 'normal',
          }
        }}
        density='comfortable'
      />
    </div>
  )
}
