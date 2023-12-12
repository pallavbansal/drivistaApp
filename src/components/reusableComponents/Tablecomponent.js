import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import {Table, Row, Cell, TableWrapper} from 'react-native-table-component';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

const TableComponent = ({itinerary, handleDeleteItenararyRow,roundTripData}) => {

  console.log("round trip in tablecomp:",roundTripData);
  const tableHead = ['From', 'To','Days','Arrival Date',  'Action'];
  var {width} = Dimensions.get('window');
  const cellWidth = 80;
  const dateWidth = 80;
  const _alertIndex = index => {
    Alert.alert(`This is row ${index + 1}`);
  };
  function getOnlyDate(dateTime)
  {
    const dateStr = dateTime.replace('p.m.', 'PM').replace('a.m.', 'AM');
    const inputDate = new Date(dateStr);

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const month = monthNames[inputDate.getMonth()];
    const day = inputDate.getDate();
    const year = inputDate.getFullYear();

    const formattedDate = `${month} ${day}, ${year}`;

    console.log('Formatted Date:', formattedDate); // Output: "September 24, 2023"


    return formattedDate;

  }


  const element = (data, index) => {
    if (index !== 0) {
      return (
        <TouchableOpacity onPress={() => handleDeleteItenararyRow(data)}>
          <View style={styles.btn}>
            <Icon name="trash" size={20} color="red" />
            {/* <Text style={styles.btnText}>Delete</Text> */}
          </View>
        </TouchableOpacity>
      );
    }
    return null; // Return null for index 0
  };


  return (
    <ScrollView horizontal>
    <View style={styles.container}>
      <Table borderStyle={{borderColor: 'transparent'}}>
        <Row data={tableHead} style={styles.head} width={cellWidth} textStyle={styles.text} />
        {itinerary.map((rowData, index) => (
          <TableWrapper key={index} style={styles.row} width={cellWidth}>
            <Cell
              data={rowData.From}
              // data={roundTripData[0].From}
              textStyle={styles.text}
              width={cellWidth}
            />
            <Cell data={rowData.To}  textStyle={styles.text} width={cellWidth} />

            <Cell
              data={rowData.Day}
              textStyle={styles.text}
              width={cellWidth}
            />
             <Cell
              data= {getOnlyDate(rowData.ArrivalDate)}
              textStyle={styles.text}
              width={cellWidth}
            />
            {/* <Cell

              data= {getOnlyDate(rowData.Date)}
              textStyle={styles.text}
              width={cellWidth}

            /> */}

            <Cell data={element(rowData, index)}  textStyle={styles.text}    width={cellWidth}/>
          </TableWrapper>
        ))}
            {roundTripData.map((rowData, index) => (
          <TableWrapper key={index} style={styles.row} width={cellWidth}>
            <Cell
              data={rowData.From}
              // data={roundTripData[0].From}
              textStyle={styles.text}
              width={cellWidth}
            />
            <Cell data={rowData.To}  textStyle={styles.text} width={cellWidth} />
            <Cell
              data={'0'}
              textStyle={styles.text}
              width={cellWidth}
            />
            <Cell
              data={getOnlyDate(rowData.ArrivalDate)}
              textStyle={styles.text}
              width={cellWidth}
            />

             {/* <Cell
              data={getOnlyDate(rowData.ArrivalDate)}
              textStyle={styles.text}
              width={cellWidth}
            /> */}
            {/* <Cell
              data={getOnlyDate(rowData.ArrivalDate)}
              textStyle={styles.text}
              width={cellWidth}

            /> */}
{/*
            <Cell data={element(rowData, index)}  textStyle={styles.text}    width={cellWidth}/> */}
          </TableWrapper>
        ))}


      </Table>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000000',
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff',
    fontFamily: 'Verdana',
    fontSize: 12,

  },
  text: {margin: 6, fontFamily: 'Verdana', fontSize: 12},
  row: {
    flexDirection: 'row',
    fontFamily: 'Verdana',
    fontSize: 12,


  },
  btn: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center'},
  // btnText: { textAlign: 'center', color: '#fff', marginLeft: 2 }, // Add some space between icon and text
});

export default TableComponent;
