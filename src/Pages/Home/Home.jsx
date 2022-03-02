import React, { useState, useEffect } from "react";
import styles from "./Home.module.scss";
import data from "../../store/data";
import { observer } from "mobx-react";

function Home(props) {

  const [search, setSearch] = useState("")
  const [shortName, setShortName] = useState("")
  const [fullName, setFullName] = useState("")
  const [innKpp, setInnKpp] = useState("")
  const [address, setAddress] = useState("")

// eslint-disable-next-line react-hooks/exhaustive-deps


  return (
    <div className={styles.main}>
        <div className={styles.container}>
          <h3 style={{paddingTop: 40}}>Поиск компании или ИП</h3>
          <p>Тестовое задание для DaData</p>
          <div className={styles.search_block}>
            <input value={search} onChange={(e) => {
              setSearch(e.target.value)
              data.getCompanyData(e.target.value)
            }} style={{marginTop: 30}} type="text" placeholder="Search" className={styles.input} />
            
            <div className={styles.result_block}>
              {
                data.companyData.map((el, i) => {
                  return (
                    <div key={i} className={styles.result_card} onClick={() => clickDataCompany(el, setShortName, setFullName, setInnKpp, setAddress, setSearch)}>
                      <b>{ el.unrestricted_value}</b>
                      <small>{ el.data.address.unrestricted_value }</small>
                    </div>
                  )
                })
              }
            </div>

            <small className={styles.label_input}>Краткое наименование</small>
            <input value={shortName} onChange={(e) => setShortName(e.target.value)} type="text" className={styles.input} />

            <small className={styles.label_input}>Полное наименование</small>
            <input value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" className={styles.input} />

            <small className={styles.label_input}>ИНН / КПП</small>
            <input value={innKpp} onChange={(e) => setInnKpp(e.target.value)} type="text" className={styles.input} />

            <small className={styles.label_input}>Адрес</small>
            <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" className={styles.input} />
          </div>
        </div>

        <div className={styles.alert}>
          <p>Я решил сделать это задание на React, Axios, Mobx и SCSS чтобы показать свои навыки. <br/>
          Так же я могу сделать это во Vue.js</p>
          <p style={{fontSize: 24, marginTop: 10}}>Мой Telegram для связи <a href="https://t.me/tekub">@tekub</a></p>
        </div>
    </div>
  );

}

const clickDataCompany = (value, shortName, fullName, innKpp, address, search) => {
  console.log(value.data)
  shortName(value.data.name.short)
  fullName(value.data.name.full_with_opf)
  innKpp(`ИНН: ${value.data.inn} / КПП: ${value.data.kpp}`)
  address(value.data.address.unrestricted_value)

  search("")
  data.resetData([])

}
export default observer(Home);
