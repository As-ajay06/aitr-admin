import { Button } from "node_modules/react-bootstrap/esm";

export function ImportFiles() {

    const handleSubmit = () => {
        // todo : write the logic to submit data to mongoose. and also show the data
    }

    return <div>
        <form onSubmit={handleSubmit}>
        <input
            type="file"
            name="uploadFile"
        />
        <Button type="submit">Submit</Button>
        </form>

    </div>
}