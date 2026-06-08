import { Text, TouchableOpacity, View, StyleSheet, Image, FlatList } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native';

export default function AdminDashboardScreen() {
    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState(new Date());

    const [visitors, setVisitors] = useState([]);

    const data = [
        { label: 'All', value: '1' },
        { label: 'Approved', value: '2' },
        { label: 'Rejected', value: '3' },
        { label: 'Pending', value: '4' },
    ];
    const [value, setValue] = useState(null);

    const route = useRoute();

    useEffect(() => {
        if (route.params?.newVisitor) {

            setVisitors((prev) => {
                const exists = prev.find(
                    v => v.id === route.params.newVisitor.id
                );

                if (exists) return prev;

                return [route.params.newVisitor, ...prev];
            });

        }
    }, [route.params?.newVisitor]);

    const filteredVisitors = visitors.filter((item) => {
        const matchStatus =
            value === null || value === "0" ? true : value === "2"
                    ? item.status === "approved"
                    : value === "3"
                        ? item.status === "rejected"
                        : value === "4"
                            ? item.status === "pending"
                            : true;

        const matchDate =
            !selectedDate
                ? true
                : item.date === selectedDate.toISOString().split("T")[0];

        return matchStatus && matchDate;
    });


    const totalCount = visitors.length;

    const approvedCount = visitors.filter(
        v => v.status === "approved"
    ).length;

    const pendingCount = visitors.filter(
        v => v.status === "pending"
    ).length;

    const rejectedCount = visitors.filter(
        v => v.status === "rejected"
    ).length;
    return (
        <View style={styles.parentContainer}>
            <View style={styles.header}>
                <Image source={require('../assets/my-images/back.png')} />
                <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                    <Text style={styles.backText}>Home</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.back}>
                <Text style={styles.title}>Admin Dashboard</Text>
                <TouchableOpacity style={styles.newbtn} onPress={() => navigation.navigate('FormScreen')}>
                    <Text style={styles.text}>New Visit</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.ruler}></View>
            <View style={styles.stats}>
                <View style={styles.total}>
                    <Text style={styles.heading}>Total</Text>
                    <Text style={styles.count}>{totalCount}</Text>
                </View>
                <View style={styles.total}>
                    <Text style={styles.heading}>Approved</Text>
                    <Text style={{ color: '#00a63d', fontWeight: 'bold', fontSize: 20 }}>{approvedCount}</Text>
                </View>
                <View style={styles.total}>
                    <Text style={styles.heading}>Pending</Text>
                    <Text style={{ color: '#e17100', fontWeight: 'bold', fontSize: 20 }}>{pendingCount}</Text>
                </View>
                <View style={styles.total}>
                    <Text style={styles.heading}>Rejected</Text>
                    <Text style={{ color: '#e17100', fontWeight: 'bold', fontSize: 20 }}>{rejectedCount}</Text>
                </View>
            </View>
            <View style={styles.parentpicker}>
                <Text style={styles.select}>Apply the filter to see all entries</Text>
                <View style={styles.selectedDate}>
                    <View style={styles.datepicker}>
                        <Text style={styles.range}>From</Text>
                        <DateTimePicker
                            value={selectedDate}
                            mode="date"
                            display="default"
                            style={styles.date}
                            onChange={(event, date) => {
                                if (date) {
                                    setSelectedDate(date);
                                }
                            }}
                        />
                    </View>
                    <View style={styles.datepicker}>
                        <Text style={styles.range}>To</Text>
                        <DateTimePicker
                            value={selectedDate}
                            style={styles.date}
                            mode="date"
                            display="default"
                            onChange={(event, date) => {
                                if (date) {
                                    setSelectedDate(date);
                                }
                            }}
                        />
                    </View>
                </View>
                <Text style={styles.status}>Status</Text>
                <Dropdown
                    style={styles.dropdown}
                    labelField="label"
                    valueField="value"
                    value={value}
                    data={data}
                    placeholder='Select Status'
                    onChange={(item) => {
                        setValue(item.value)
                    }}
                />

            </View>
            <View style={styles.tableContainer}>
                <Text style={styles.tableText}>Entries showing the data of visitor Pass</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                    <View style={styles.table}>
                        {/* HEADER (always visible) */}
                        <View style={styles.headerRow}>
                            <Text style={styles.headerText}>Name</Text>
                            <Text style={styles.headerText}>Email</Text>
                            <Text style={styles.headerText}>Phone</Text>
                            <Text style={styles.headerText}>Date</Text>
                            <Text style={styles.headerText}>Status</Text>
                        </View>

                        {/* TABLE */}
                        <FlatList
                            data={filteredVisitors.length ? filteredVisitors : visitors} //if the length is greater than zero than return values of visitors 
                            keyExtractor={(item) => item.id} //give the id of item otherwise index 
                            renderItem={({ item }) => (
                                <View style={styles.row}>
                                    <Text style={styles.cell}>{item.name || "—"}</Text>
                                    <Text style={styles.cell}>{item.email || "—"}</Text>
                                    <Text style={styles.cell}>{item.phone || "—"}</Text>
                                    <Text style={styles.cell}>{item.date || "—"}</Text>
                                    <Text style={styles.cell}>{item.status || "—"}</Text>
                                </View>
                            )}
                        />
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

// if (filteredVisitors.length > 0) {
//    use filteredVisitors;
// } else {
//    use visitors;
// }

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    back: {
        display: 'flex',
        flexDirection: 'row',
        gap: 120,
        position: 'absolute',
        top: 100,
        left: 20
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        position: 'absolute',
        top: 70,
        left: 20
    },
    backText: {
        paddingTop: 4
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    newbtn: {
        width: 85,
        height: 35,
        borderRadius: 4,
        borderColor: 'gray',
        borderWidth: 1,
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center',
        padding: 8,
    },
    text: {
        textAlign: 'center'
    },
    ruler: {
        borderColor: '#e3e3e3ff',
        borderWidth: 1,
        marginBottom: 12
    },
    stats: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginLeft: 20,
        marginRight: 20,
        position: 'absolute',
        top: 155
    },
    total: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddddddff',
        padding: 8,
        width: 175,
        height: 70,
        gap: 6,
        marginBottom: 10
    },
    heading: {
        fontSize: 16,
        color: '#667891'
    },
    count: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    parentpicker: {
        flexDirection: 'column',
        gap: 10,
        marginLeft: 20,
        position: 'absolute',
        top: 340,
        backgroundColor: '#e7e7e7ff',
        marginTop: 0,
        width: 360,
        gap: 12,
        paddingTop: 8,
        paddingBottom: 16,
        borderRadius: 4,
    },
    range: {
        fontSize: 14,
        marginLeft: 12,
        fontWeight: 'semibold'
    },
    selectedDate: {
        flexDirection: 'row',
        gap: 12
    },
    datepicker: {
        gap: 8
    },
    select: {
        fontSize: 16,
        marginLeft: 12,
        fontWeight: 'semibold',
        color: '#667891'
    },
    dropdown: {
        marginLeft: 12,
        marginRight: 20,
        backgroundColor: '#dbdadaff',
        padding: 12,
        borderRadius: 4
    },
    status: {
        fontSize: 16,
        marginLeft: 12,
        fontWeight: 'semibold',
        color: '#667891'
    },
    table: {
        backgroundColor: '#e5e5e5ff',
        width: 610,
        padding: 12,
        borderRadius: 4
    },
    headerRow: {
        flexDirection: 'row',
        gap: 100,
        justifyContent: 'flex-start'
    },
    headerText: {
        fontSize: 14,
        fontWeight: 'semibold',
        color: '#667891'
    },
    row: {
        flexDirection: 'row',
        gap: 20
    },
    cell: {
        flexDirection: 'flex-start',
    },
    tableContainer: {
        marginTop: 310,
        marginLeft: 20,
        marginRight: 20,
        gap: 8
    },
    tableText: {
        fontSize: 14,
        fontWeight: 'semibold'
    }

})
