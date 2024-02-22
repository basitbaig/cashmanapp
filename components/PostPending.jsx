
export default async function PostPending({_id}) {

    const transid = _id;

    alert(transid);

  return (
    <div>
        Post Pending
        <h1>{transid}</h1>
    </div>
  )
}

 