import React from "react";
import { FaTwitterSquare, FaTumblrSquare, FaQuoteLeft } from "react-icons/fa";
import "./Wrapper.css";

const colors = [
    "#16a085",
    "#27ae60",
    "#2c3e50",
    "#f39c12",
    "#e74c3c",
    "#9b59b6",
    "#FB6964",
    "#342224",
    "#472E32",
    "#BDBB99",
    "#77B1A9",
    "#73A857",
];
const API_URL =
    "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

export default class Wrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quotes: [],
            index: 0,
        };
        this.handleClick = this.handleClick.bind(this);
        this.getRandomIndex = this.getRandomIndex.bind(this);
        this.getRandomBackground = this.getRandomBackground.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.getRandomIndex();
    }

    componentDidMount() {
        fetch(API_URL)
            .then((res) => res.json())
            .then((res) => {
                this.setState(
                    {
                        quotes: res.quotes,
                    },
                    this.getRandomIndex
                );
            });
    }

    getRandomIndex = () => {
        const { quotes } = this.state;

        if (quotes.length > 0) {
            const index = Math.floor(Math.random() * quotes.length);
            this.setState({
                index,
            });
        }
    };

    getRandomBackground() {
        return Math.floor(Math.random() * colors.length);
    }

    render() {
        const { quotes, index } = this.state;
        const quote = quotes[index];
        const tweetUrl =
            quote &&
            `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=` +
                encodeURIComponent(`" ${quote.quote} " ${quote.author}`);
        const tumblrUrl =
            quote &&
            `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=` +
                encodeURIComponent(`${quote.author}`) +
                `&content=` +
                encodeURIComponent(`${quote.quote}`) +
                `&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`;

        let style_idx_color = this.getRandomBackground();
        let styles_color = { color: colors[style_idx_color] };
        let background_color = { backgroundColor: colors[style_idx_color] };
        return (
            <div id="wrapper" style={background_color}>
                <div id="quote-box">
                    <div key={Math.random()} id="text">
                        {quote && (
                            <p style={styles_color}>
                                <FaQuoteLeft /> {quote.quote}
                            </p>
                        )}
                    </div>
                    <div key={Math.random()} id="author">
                        {quote && (
                            <cite style={styles_color}>- {quote.author}</cite>
                        )}
                    </div>
                    <div className="buttons">
                        <div className="links">
                            <a
                                href={tweetUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={styles_color}
                                title="Tweet this quote"
                            >
                                <FaTwitterSquare />
                            </a>
                            <a
                                href={tumblrUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={styles_color}
                                title="Post this quote on tumblr!"
                            >
                                <FaTumblrSquare />
                            </a>
                        </div>

                        <button
                            id="bton"
                            style={background_color}
                            onClick={this.handleClick}
                        >
                            New quote
                        </button>
                    </div>
                </div>
                <div className="footer">
                    <h4>by Anthony Herrera</h4>
                </div>
            </div>
        );
    }
}
