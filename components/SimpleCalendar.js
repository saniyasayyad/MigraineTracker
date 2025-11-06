import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const SimpleCalendar = ({markedDates, onDayPress}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const today = new Date();
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const formatDate = (day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const isToday = (day) => {
    const dateStr = formatDate(day);
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    return dateStr === todayStr;
  };

  const getDayColor = (day) => {
    const dateStr = formatDate(day);
    if (markedDates[dateStr]) {
      return markedDates[dateStr].selectedColor || '#ff4444';
    }
    return null;
  };

  const changeMonth = (direction) => {
    setCurrentMonth(new Date(year, month + direction, 1));
  };

  const renderDays = () => {
    const days = [];
    const emptyDays = Array(startingDayOfWeek).fill(null);

    // Empty cells for days before month starts
    emptyDays.forEach((_, index) => {
      days.push(
        <View key={`empty-${index}`} style={styles.dayCell} />,
      );
    });

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatDate(day);
      const dayColor = getDayColor(day);
      const isTodayDay = isToday(day);

      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.dayCell,
            isTodayDay && styles.todayCell,
            dayColor && {backgroundColor: dayColor},
          ]}
          onPress={() => onDayPress && onDayPress({dateString: dateStr})}>
          <Text
            style={[
              styles.dayText,
              isTodayDay && styles.todayText,
              dayColor && styles.markedDayText,
            ]}>
            {day}
          </Text>
          {dayColor && <View style={styles.dot} />}
        </TouchableOpacity>,
      );
    }

    return days;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => changeMonth(-1)}>
          <Text style={styles.navButton}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.monthYear}>
          {monthNames[month]} {year}
        </Text>
        <TouchableOpacity onPress={() => changeMonth(1)}>
          <Text style={styles.navButton}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.weekDaysContainer}>
        {weekDays.map((day, index) => (
          <View key={index} style={styles.weekDay}>
            <Text style={styles.weekDayText}>{day}</Text>
          </View>
        ))}
      </View>

      <View style={styles.daysContainer}>{renderDays()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
  },
  navButton: {
    fontSize: 24,
    color: '#ff4444',
    fontWeight: 'bold',
    paddingHorizontal: 12,
  },
  monthYear: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d4150',
  },
  weekDaysContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  weekDay: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  weekDayText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  todayCell: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ff4444',
  },
  dayText: {
    fontSize: 14,
    color: '#2d4150',
  },
  todayText: {
    fontWeight: 'bold',
    color: '#ff4444',
  },
  markedDayText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dot: {
    position: 'absolute',
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#fff',
  },
});

export default SimpleCalendar;


