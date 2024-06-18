import { Link } from "react-router-dom";

export function NotFound() {
    return (
        <div style={{ padding: 16 }}>
            <p style={{ marginTop: 0 }}>Page not found</p>
            <Link to={"/"}>Go home</Link>
        </div>
    );
}
