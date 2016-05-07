import React, {
  Component,
  PickerIOS,
  PropTypes
} from 'react-native';

export default class Picker extends Component {
  render() {
    const { value, onChange, options } = this.props;

    return (
      <PickerIOS
        selectedValue={value}
        onValueChange={onChange}>
        {options.map((option) => (
          <PickerIOS.Item
            key={option}
            value={option}
            label={option} />
        ))}
      </PickerIOS>


      // <span>
      //   <h1>{value}</h1>
      //   <select onChange={e => onChange(e.target.value)}
      //           value={value}>
      //     {options.map(option =>
      //       <option value={option} key={option}>
      //         {option}
      //       </option>)
      //     }
      //   </select>
      // </span>
    )
  }
}

Picker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
