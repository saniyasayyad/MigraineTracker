import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const SimpleLineChart = ({data, labels, height = 200}) => {
  const maxValue = Math.max(...data);
  const chartHeight = height - 60;

  return (
    <View style={styles.chartContainer}>
      <View style={[styles.chart, {height: chartHeight, position: 'relative'}]}>
        {/* Draw points and connecting bars */}
        {data.map((value, index) => {
          const barHeight = (value / maxValue) * chartHeight;
          const itemWidth = 100 / data.length;

          return (
            <View
              key={index}
              style={[
                styles.lineChartItem,
                {
                  left: `${index * itemWidth}%`,
                  width: `${itemWidth}%`,
                },
              ]}>
              <View style={styles.lineChartBarContainer}>
                <View
                  style={[
                    styles.lineChartBar,
                    {
                      height: barHeight,
                    },
                  ]}
                />
                <View
                  style={[
                    styles.linePoint,
                    {
                      bottom: barHeight - 5,
                    },
                  ]}
                />
              </View>
              <View style={styles.lineChartLabels}>
                <Text style={styles.chartLabel}>{labels[index]}</Text>
                <Text style={styles.chartValue}>{value}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export const SimpleBarChart = ({data, labels, height = 200}) => {
  const maxValue = Math.max(...data);
  const chartHeight = height - 40;

  return (
    <View style={styles.chartContainer}>
      <View style={[styles.chart, {height: chartHeight}]}>
        {data.map((value, index) => {
          const barHeight = (value / maxValue) * chartHeight;

          return (
            <View key={index} style={styles.chartItem}>
              <View style={styles.barContainer}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: barHeight,
                      backgroundColor: '#ff4444',
                    },
                  ]}
                />
              </View>
              <Text style={styles.chartLabel}>{labels[index]}</Text>
              <Text style={styles.chartValue}>{value}%</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export const SimplePieChart = ({data, height = 220}) => {
  const total = data.reduce((sum, item) => sum + item.frequency, 0);
  let currentAngle = 0;

  return (
    <View style={styles.pieChartContainer}>
      <View style={[styles.pieChart, {width: height, height: height}]}>
        {data.map((item, index) => {
          const percentage = (item.frequency / total) * 100;
          const angle = (item.frequency / total) * 360;
          const startAngle = currentAngle;
          currentAngle += angle;

          // Simple visualization using colored segments in a circle
          return (
            <View
              key={index}
              style={[
                styles.pieSegment,
                {
                  backgroundColor: item.color,
                  width: height * 0.8,
                  height: height * 0.8,
                  borderRadius: (height * 0.8) / 2,
                },
              ]}
            />
          );
        })}
      </View>
      <View style={styles.pieLegend}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendRow}>
            <View
              style={[styles.legendColor, {backgroundColor: item.color}]}
            />
            <Text style={styles.legendText}>
              {item.name}: {item.frequency}%
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

// Simpler pie chart using bars
export const SimplePieChartBar = ({data}) => {
  const total = data.reduce((sum, item) => sum + item.frequency, 0);

  return (
    <View style={styles.pieBarContainer}>
      {data.map((item, index) => {
        const percentage = (item.frequency / total) * 100;

        return (
          <View key={index} style={styles.pieBarRow}>
            <View style={styles.pieBarLabelContainer}>
              <View
                style={[styles.legendColor, {backgroundColor: item.color}]}
              />
              <Text style={styles.pieBarLabel}>{item.name}</Text>
            </View>
            <View style={styles.pieBarTrack}>
              <View
                style={[
                  styles.pieBarFill,
                  {
                    width: `${percentage}%`,
                    backgroundColor: item.color,
                  },
                ]}
              />
            </View>
            <Text style={styles.pieBarValue}>{item.frequency}%</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    width: '100%',
    paddingVertical: 10,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 10,
    marginBottom: 10,
    position: 'relative',
  },
  chartItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  lineChartItem: {
    position: 'absolute',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  lineChartBarContainer: {
    width: '60%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  lineChartBar: {
    width: 3,
    backgroundColor: '#ff4444',
    opacity: 0.3,
  },
  lineChartLabels: {
    marginTop: 8,
    alignItems: 'center',
  },
  barContainer: {
    width: '80%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bar: {
    width: '100%',
    borderRadius: 4,
    minHeight: 4,
  },
  lineChartContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  lineSegment: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#ff4444',
    transformOrigin: 'left center',
  },
  linePoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ff4444',
    borderWidth: 2,
    borderColor: '#fff',
  },
  chartLabel: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  chartValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2d4150',
    marginTop: 2,
  },
  pieChartContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  pieChart: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pieSegment: {
    margin: 2,
  },
  pieLegend: {
    marginTop: 20,
    width: '100%',
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  legendText: {
    fontSize: 14,
    color: '#666',
  },
  pieBarContainer: {
    width: '100%',
    paddingVertical: 10,
  },
  pieBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  pieBarLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
  },
  pieBarLabel: {
    fontSize: 14,
    color: '#2d4150',
    marginLeft: 8,
  },
  pieBarTrack: {
    flex: 1,
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  pieBarFill: {
    height: '100%',
    borderRadius: 10,
  },
  pieBarValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2d4150',
    width: 50,
    textAlign: 'right',
  },
});

