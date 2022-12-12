import img1 from '../../images/img1.jpg'
import img2 from '../../images/img2.jpg'
import img3 from '../../images/img3.jpg'
import img4 from '../../images/img4.jpg'
import img5 from '../../images/img5.jpg'
import img6 from '../../images/img6.jpg'
import styles from './index.module.css'
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {url} from "../utils";

const MainPage = (props: {
    phoneFirstPart: string,
    phoneSecondPart: string
}) => {
    const { phoneFirstPart, phoneSecondPart } = props
    const [result, setResult] = useState('')

    let date = new Date()
    const month = date.getMonth() + 1
    const d = date.getDate()
    const timeStr = "" +
        date.getFullYear() +
        "." +
        (month < 10 ? "0" + month : month) +
        "." +
        (d < 10 ? "0" + d : d) +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds()

    useEffect(() => {
        axios({
            url: url + "result",
            method: 'get'
        })
            .then((resp: AxiosResponse<string>) => setResult(resp.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div style={{width: '100%'}}>
            <div className={styles.tooBar}>
                <img src={img5} className={styles.backButton}/>
                <div className={styles.cardName}>通信行程卡</div>
                <img src={img6} className={styles.rightButtonGroup}/>
            </div>
            <div className={styles.container}>
                <div className={styles.topHeader}>
                    <img  src={img3} style={{height: 40}}/>
                </div>

                <div className={styles.topBullshit}>
                    疫情防控，人人有责
                </div>
                <div className={styles.mainBoxWrapper}>
                    <img className={styles.mainBoxHeaderImage} src={img2}/>
                    <div className={styles.mainBox}>
                        <div className={styles.mainBoxInfo}>
                            {phoneFirstPart}****{phoneSecondPart}的动态行程卡
                        </div>
                        <div className={styles.mainBoxUpdateTime}>
                            更新于：{timeStr}
                        </div>
                        <div className={styles.mainBoxImageBox}>
                            <img className={styles.mainBoxImage} src={img4}/>
                        </div>
                        <div className={styles.mainBoxLine}/>
                        <div className={styles.positionWrapper}>
                            <span className={styles.positionLabel}>您于前14天内到达或途径：</span>
                            <span className={styles.positionInfo}>{result}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.bottomBullshit}>
                    结果包含您在前14天内到访的国家（地区）于停留4小时以上的国内城市
                </div>
                <div className={styles.bottomBullshit}>
                    色卡仅对到访地作提醒，不关联健康状况
                </div>
                <div className={styles.serviceContainer}>
                    <div className={styles.serviceLabelLine}/>
                    <div className={styles.serviceLabel}>本服务联合提供</div>
                    <div className={styles.serviceLabelLine}/>
                </div>
                <div className={styles.serviceProvidersImageBox}>
                    <img className={styles.serviceProvidersImage} src={img1}/>
                </div>
                <div className={styles.bottomHotline}>客服热线：10000 / 10086 / 10010</div>
            </div>
            <div className={styles.bottomContainer}>
                <div className={styles.bottomBullshitLink}>
                    <div className={styles.bottomBullshitLinkLine1}>
                        一证通查来了！
                    </div>
                    <div className={styles.bottomBullshitLinkLine2}>
                        立即点击进入
                    </div>
                </div>
                <div/>
                <Link to={"/settings"}>
                    <div className={styles.bottomBullshitBox}>
                        <div className={styles.bottomBullshitLine1}>
                            全国移动电话卡"一证通查"
                        </div>
                        <div className={styles.bottomBullshitLine2}>
                            防范欺诈，保护你我
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default MainPage