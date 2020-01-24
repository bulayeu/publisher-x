import VideoToGif from '../components/VideoToGif';
import Head from "next/head";

const Home = () => {
    return (
        <div>
            <Head>
                <link href="/styles.css" rel="stylesheet"/>
            </Head>
            <div className='home'>
                <VideoToGif/>
            </div>
        </div>
    )
}

export default Home
