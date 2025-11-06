import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from 'react-native';
import CustomSlider from '../components/CustomSlider';

const LogAttackScreen = ({navigation}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [severity, setSeverity] = useState(5);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [selectedTriggers, setSelectedTriggers] = useState([]);
  const [selectedMedications, setSelectedMedications] = useState([]);
  const [notes, setNotes] = useState('');

  const totalSteps = 5;
  const steps = ['Severity', 'Symptoms', 'Triggers', 'Medications', 'Review'];

  // Placeholder data
  const symptoms = [
    'Throbbing pain',
    'Nausea',
    'Light sensitivity',
    'Sound sensitivity',
    'Aura',
    'Dizziness',
    'Blurred vision',
    'Neck pain',
  ];

  const triggers = [
    'Stress',
    'Hormonal',
    'Weather change',
    'Lack of sleep',
    'Food',
    'Alcohol',
    'Bright lights',
    'Dehydration',
  ];

  const medications = [
    'Ibuprofen',
    'Acetaminophen',
    'Sumatriptan',
    'Excedrin',
    'Prescription',
    'None',
  ];

  const getEmojiForSeverity = (value) => {
    if (value <= 2) return '😊';
    if (value <= 4) return '😐';
    if (value <= 6) return '😟';
    if (value <= 8) return '😣';
    return '😫';
  };

  const toggleSelection = (item, array, setArray) => {
    if (array.includes(item)) {
      setArray(array.filter(i => i !== item));
    } else {
      setArray([...array, item]);
    }
  };

  const renderProgressBar = () => {
    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {width: `${(currentStep / totalSteps) * 100}%`},
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          Step {currentStep} of {totalSteps}: {steps[currentStep - 1]}
        </Text>
      </View>
    );
  };

  const renderSeverityStep = () => {
    return (
      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>How severe is your migraine?</Text>
        <View style={styles.severityContainer}>
          <Text style={styles.severityEmoji}>{getEmojiForSeverity(severity)}</Text>
          <Text style={styles.severityValue}>{severity}/10</Text>
        </View>
        <CustomSlider
          style={styles.slider}
          minimumValue={0}
          maximumValue={10}
          value={severity}
          onValueChange={setSeverity}
          minimumTrackTintColor="#ff4444"
          maximumTrackTintColor="#e0e0e0"
          thumbTintColor="#ff4444"
          step={1}
        />
        <View style={styles.sliderLabels}>
          <Text style={styles.sliderLabel}>Mild</Text>
          <Text style={styles.sliderLabel}>Severe</Text>
        </View>
      </View>
    );
  };

  const renderChipSelection = (title, items, selectedItems, setSelectedItems) => {
    return (
      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>{title}</Text>
        <View style={styles.chipContainer}>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.chip,
                selectedItems.includes(item) && styles.chipSelected,
              ]}
              onPress={() => toggleSelection(item, selectedItems, setSelectedItems)}>
              <Text
                style={[
                  styles.chipText,
                  selectedItems.includes(item) && styles.chipTextSelected,
                ]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderNotesStep = () => {
    return (
      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Additional Notes (Optional)</Text>
        <TextInput
          style={styles.notesInput}
          multiline
          numberOfLines={6}
          placeholder="Add any additional information about your migraine..."
          value={notes}
          onChangeText={setNotes}
          textAlignVertical="top"
        />
      </View>
    );
  };

  const renderReviewStep = () => {
    return (
      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Review Your Entry</Text>

        <View style={styles.reviewSection}>
          <Text style={styles.reviewLabel}>Severity:</Text>
          <Text style={styles.reviewValue}>
            {severity}/10 {getEmojiForSeverity(severity)}
          </Text>
        </View>

        <View style={styles.reviewSection}>
          <Text style={styles.reviewLabel}>Symptoms:</Text>
          <Text style={styles.reviewValue}>
            {selectedSymptoms.length > 0
              ? selectedSymptoms.join(', ')
              : 'None selected'}
          </Text>
        </View>

        <View style={styles.reviewSection}>
          <Text style={styles.reviewLabel}>Triggers:</Text>
          <Text style={styles.reviewValue}>
            {selectedTriggers.length > 0
              ? selectedTriggers.join(', ')
              : 'None selected'}
          </Text>
        </View>

        <View style={styles.reviewSection}>
          <Text style={styles.reviewLabel}>Medications:</Text>
          <Text style={styles.reviewValue}>
            {selectedMedications.length > 0
              ? selectedMedications.join(', ')
              : 'None selected'}
          </Text>
        </View>

        {notes && (
          <View style={styles.reviewSection}>
            <Text style={styles.reviewLabel}>Notes:</Text>
            <Text style={styles.reviewValue}>{notes}</Text>
          </View>
        )}

        {/* Placeholder Location & Weather */}
        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>📍 Location</Text>
          <Text style={styles.infoCardText}>New York, NY, USA</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>🌤️ Weather</Text>
          <Text style={styles.infoCardText}>72°F, Partly Cloudy</Text>
        </View>
      </View>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderSeverityStep();
      case 2:
        return renderChipSelection(
          'Select Symptoms',
          symptoms,
          selectedSymptoms,
          setSelectedSymptoms,
        );
      case 3:
        return renderChipSelection(
          'Select Triggers',
          triggers,
          selectedTriggers,
          setSelectedTriggers,
        );
      case 4:
        return renderChipSelection(
          'Select Medications',
          medications,
          selectedMedications,
          setSelectedMedications,
        );
      case 5:
        return renderReviewStep();
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Placeholder - would normally save data here
      navigation.goBack();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderProgressBar()}
      <ScrollView style={styles.scrollView}>
        {renderStepContent()}
      </ScrollView>
      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={[styles.navButton, styles.backButton]}
          onPress={handleBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, styles.nextButton]}
          onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentStep === totalSteps ? 'Save' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  progressContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ff4444',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  stepContainer: {
    padding: 20,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2d4150',
    marginBottom: 24,
    textAlign: 'center',
  },
  severityContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  severityEmoji: {
    fontSize: 64,
    marginBottom: 12,
  },
  severityValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ff4444',
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 12,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  sliderLabel: {
    fontSize: 14,
    color: '#666',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    marginBottom: 10,
  },
  chipSelected: {
    backgroundColor: '#ff4444',
    borderColor: '#ff4444',
  },
  chipText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#fff',
  },
  notesInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  reviewSection: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  reviewLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    fontWeight: '600',
  },
  reviewValue: {
    fontSize: 16,
    color: '#2d4150',
  },
  infoCard: {
    backgroundColor: '#f0f8ff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4a90e2',
  },
  infoCardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2d4150',
    marginBottom: 4,
  },
  infoCardText: {
    fontSize: 16,
    color: '#666',
  },
  navigationButtons: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    gap: 12,
  },
  navButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#f5f5f5',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  nextButton: {
    backgroundColor: '#ff4444',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default LogAttackScreen;


