import Byte from './Byte';

const getBytes = async () => {
    try {
      const res = await fetch(`${process.env.MONGODB_DATA_API_URL}/api/bytes`, {
        cache: 'no-store',
      });
      if (!res.ok) {
        throw new Error('Failed to fetch bytes');
      }
      return res.json();
    } catch (error) {
      console.log('Error loading bytes: ', error);
      throw error;
    }
  };
  

export default async function ByteList() {
  const { bytes } = await getBytes();

  return (
    <>
    {bytes.map(b => (
        <Byte key={b._id} byteData={b} />
        ))}
    </>
  );
}
