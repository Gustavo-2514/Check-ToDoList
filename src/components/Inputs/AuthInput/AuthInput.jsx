import styles from "./AuthInput.module.css";

export default function AuthInput({
  htmlFor,
  labelText,
  type,
  placeholder,
  value,
  handleOnChange,
  children,
  minCharacters,
  reference,
  
}) {


  return (
    <div className={styles.containerAuthInput}>
      <label className={styles.labelAuthInput} htmlFor={htmlFor}>
        {labelText}
      </label>
      <input
        className={styles.inputAuthInput}
        value={value}
        onChange={handleOnChange}
        type={type}
        name={htmlFor}
        id={htmlFor}
        placeholder={placeholder}
        minLength={minCharacters}
        ref={reference}
        required
      />
      {children}
    </div>
  );
}
