import getPrice from '../../utils/cryptoapi';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core';

function Coins() {
  let coins = [];
  getPrice().then(function(data) {
    data.map((item) => {
      // console.log(item);
      coins.push(item);
    }
    // console.log(data);
  )});
  console.log("coins", coins);
  console.log(Object.keys(coins));
  coins.forEach(item => console.log(item));

  // const test = ['a','b','c'];
  // test.push('d');
  // console.log(test);

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {      
        marginLeft: '100px',
        margin: theme.spacing(4),
        width: '50ch',
      },
    },
    table: {
      minWidth: 650,
    },
    heading: {
      flexGrow: 1,
      fontFamily: 'Helvetica',
      marginTop: '150px'
    },
    btnElement: {
      width: 300,
    }
  }));

  const classes = useStyles();

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  // cryptos[i] = {
  //   name: coinName,
  //   symbol: coinSymbol,
  //   price: currentPrice,
  //   priceChange24h: priceChange24h,
  //   imageUrl: imageUrl,
  //   color: priceChangeColor,
  //   graphNo: graphNo,
  //   coinUrl: coinUrl
  // }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  return (
    <TableContainer>
      <Typography variant="h4" color="textSecondary" className={classes.heading}>
        Top 10 Crypto Currencies
      </Typography>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Price&nbsp;</TableCell>
            <TableCell align="right">Price Change % (24h)&nbsp;</TableCell>
            <TableCell align="right">7 day Trend&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Coins;
