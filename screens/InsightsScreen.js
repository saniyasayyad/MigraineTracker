import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {
  SimpleLineChart,
  SimpleBarChart,
  SimplePieChartBar,
} from '../components/SimpleCharts';

const InsightsScreen = () => {
  const [activeTab, setActiveTab] = useState('Charts');

  // Placeholder data for charts
  const frequencyLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const frequencyData = [8, 12, 6, 10, 14, 9];

  const triggerLabels = ['Stress', 'Weather', 'Hormonal', 'Sleep', 'Food', 'Other'];
  const triggerData = [35, 25, 15, 12, 8, 5];

  const correlationData = [
    {
      name: 'Stress',
      frequency: 35,
      color: '#ff4444',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Weather',
      frequency: 25,
      color: '#ffaa00',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Hormonal',
      frequency: 15,
      color: '#44ff44',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Sleep',
      frequency: 12,
      color: '#4a90e2',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Food',
      frequency: 8,
      color: '#9b59b6',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Other',
      frequency: 5,
      color: '#95a5a6',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ];

  const renderChartsTab = () => {
    return (
      <ScrollView style={styles.tabContent}>
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Monthly Frequency</Text>
          <SimpleLineChart
            data={frequencyData}
            labels={frequencyLabels}
            height={220}
          />
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Trigger Frequency</Text>
          <SimpleBarChart
            data={triggerData}
            labels={triggerLabels}
            height={220}
          />
        </View>
      </ScrollView>
    );
  };

  const renderCorrelationsTab = () => {
    return (
      <ScrollView style={styles.tabContent}>
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Trigger Correlation</Text>
          <SimplePieChartBar data={correlationData} />
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Key Insights</Text>
          <View style={styles.insightItem}>
            <Text style={styles.insightText}>
              • Stress is your most common trigger (35% of attacks)
            </Text>
          </View>
          <View style={styles.insightItem}>
            <Text style={styles.insightText}>
              • Weather changes correlate with 25% of migraines
            </Text>
          </View>
          <View style={styles.insightItem}>
            <Text style={styles.insightText}>
              • Attacks are more frequent during spring months
            </Text>
          </View>
          <View style={styles.insightItem}>
            <Text style={styles.insightText}>
              • Average severity: 6.5/10 over the past 6 months
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  };

  const renderDoctorReportTab = () => {
    return (
      <ScrollView style={styles.tabContent}>
        <View style={styles.reportCard}>
          <Text style={styles.reportTitle}>Patient Report</Text>
          <Text style={styles.reportDate}>Generated: {new Date().toLocaleDateString()}</Text>

          <View style={styles.reportSection}>
            <Text style={styles.reportSectionTitle}>Summary</Text>
            <Text style={styles.reportText}>
              Over the past 6 months, you have logged 59 migraine attacks with an
              average severity of 6.5/10. The most common triggers are stress (35%),
              weather changes (25%), and hormonal factors (15%).
            </Text>
          </View>

          <View style={styles.reportSection}>
            <Text style={styles.reportSectionTitle}>Frequency</Text>
            <Text style={styles.reportText}>
              • Average: 9.8 attacks per month{'\n'}
              • Highest month: May (14 attacks){'\n'}
              • Lowest month: March (6 attacks)
            </Text>
          </View>

          <View style={styles.reportSection}>
            <Text style={styles.reportSectionTitle}>Common Symptoms</Text>
            <Text style={styles.reportText}>
              • Throbbing pain (85%){'\n'}
              • Light sensitivity (72%){'\n'}
              • Nausea (68%){'\n'}
              • Sound sensitivity (55%)
            </Text>
          </View>

          <View style={styles.reportSection}>
            <Text style={styles.reportSectionTitle}>Medications Used</Text>
            <Text style={styles.reportText}>
              • Ibuprofen: 42% of attacks{'\n'}
              • Sumatriptan: 28% of attacks{'\n'}
              • Acetaminophen: 20% of attacks{'\n'}
              • Other: 10% of attacks
            </Text>
          </View>

          <View style={styles.reportSection}>
            <Text style={styles.reportSectionTitle}>Recommendations</Text>
            <Text style={styles.reportText}>
              • Consider stress management techniques{'\n'}
              • Monitor weather patterns and plan accordingly{'\n'}
              • Maintain consistent sleep schedule{'\n'}
              • Discuss preventive medication options with your doctor
            </Text>
          </View>

          <TouchableOpacity style={styles.exportButton}>
            <Text style={styles.exportButtonText}>📄 Export Report as PDF</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Charts':
        return renderChartsTab();
      case 'Correlations':
        return renderCorrelationsTab();
      case 'Doctor Report':
        return renderDoctorReportTab();
      default:
        return renderChartsTab();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Insights & Reports</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Charts' && styles.tabActive]}
          onPress={() => setActiveTab('Charts')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Charts' && styles.tabTextActive,
            ]}>
            Charts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Correlations' && styles.tabActive]}
          onPress={() => setActiveTab('Correlations')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Correlations' && styles.tabTextActive,
            ]}>
            Correlations
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'Doctor Report' && styles.tabActive,
          ]}
          onPress={() => setActiveTab('Doctor Report')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Doctor Report' && styles.tabTextActive,
            ]}>
            Doctor Report
          </Text>
        </TouchableOpacity>
      </View>

      {renderTabContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d4150',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#ff4444',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  tabTextActive: {
    color: '#ff4444',
    fontWeight: 'bold',
  },
  tabContent: {
    flex: 1,
  },
  chartCard: {
    backgroundColor: '#fff',
    margin: 20,
    marginBottom: 10,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d4150',
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  statsCard: {
    backgroundColor: '#fff',
    margin: 20,
    marginTop: 10,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d4150',
    marginBottom: 16,
  },
  insightItem: {
    marginBottom: 12,
  },
  insightText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  reportCard: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reportTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2d4150',
    marginBottom: 8,
  },
  reportDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  reportSection: {
    marginBottom: 24,
  },
  reportSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d4150',
    marginBottom: 12,
  },
  reportText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  exportButton: {
    backgroundColor: '#ff4444',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  exportButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InsightsScreen;


