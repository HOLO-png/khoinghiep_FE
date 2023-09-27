import styles from './style.module.scss'

export const Loading = () => {
  return (
    <div className={styles['bgLoader']}>
      <div className={styles['loader']}>
        <div className={styles['dot']}></div>
        <div className={styles['dot']}></div>
        <div className={styles['dot']}></div>
        <div className={styles['dot']}></div>
        <div className={styles['dot']}></div>
      </div>
    </div>
  )
}
