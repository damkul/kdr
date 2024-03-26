import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';


export default function CommonTable({columns,rows}) {
  return (
    <div style={{ height: 400, width: '75%',marginLeft:'20%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}


// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// const CommonTable = ({data,headers}) => {
//   console.log("headers in table",headers);
//   console.log("data in table",data);
//     const StyledTableCell = styled(TableCell)(({ theme }) => ({
//         [`&.${tableCellClasses.head}`]: {
//           backgroundColor: theme.palette.secondary.main,
//           margin: theme.spacing(8),
//           color: theme.palette.common.white,
//         },
//         [`&.${tableCellClasses.body}`]: {
//           fontSize: 14,
//         },
//       }));
      
//       const StyledTableRow = styled(TableRow)(({ theme }) => ({
//         '&:nth-of-type(odd)': {
//           backgroundColor: theme.palette.action.hover,
//         },
//         // hide last border
//         '&:last-child td, &:last-child th': {
//           border: 0,
//         },
//       }));

//   return (
//     <TableContainer component={Paper} sx={{marginLeft:'18%',marginTop:'4rem',width:'80%'}}>
//     <Table sx={{ minWidth: '600', }} aria-label="customized table">
        
//       <TableHead>
//         <TableRow>
        
//         {headers.map((header) => (
//             <StyledTableCell >{header}</StyledTableCell>
//         ))}
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         { data.map((row) => (
//           <StyledTableRow key={row != undefined && row.name}>
//             <StyledTableCell component="th" scope="row">
//               {row != undefined && row.name}
//             </StyledTableCell>
//             <StyledTableCell align="right">{row != undefined && row.calories}</StyledTableCell>
//             <StyledTableCell align="right">{row != undefined && row.fat}</StyledTableCell>
//             <StyledTableCell align="right">{row != undefined && row.carbs}</StyledTableCell>
//             <StyledTableCell align="right">{row != undefined && row.protein}</StyledTableCell>
//             <StyledTableCell align="right">{row != undefined && row.protein}</StyledTableCell>
//           </StyledTableRow>
//         ))}
//       </TableBody>
//     </Table>
//   </TableContainer>
//   )
// }

// export default CommonTable