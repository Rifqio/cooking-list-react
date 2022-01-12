import "./RecipeList.css";
import Trashcan from "../../assets/delete.svg";
import { Link } from "react-router-dom";
import {
  Button,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/react";
import { projectStorage } from "../../server/config";

function RecipeList({ data }) {
  const handleClick = (id) => {
    projectStorage.collection("recipes").doc(id).delete();
    onClose()
  };

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div className="recipe-list">
      {data &&
        data.map((recipe) => (
          <div key={recipe.id} className="card">
            <h2 className="font-semibold">{recipe.title}</h2>
            <Badge colorScheme="green">{recipe.cookingTime}</Badge>
            <div>{recipe.method.substring(0, 100)}...</div>
            <Link to={`/recipes/${recipe.id}`}>
              <Button colorScheme="facebook" variant="outline">
                Cook This
              </Button>
            </Link>
            <img src={Trashcan} className="delete" onClick={onOpen} alt="del"/>
            <Modal motionPreset='slideInBottom' isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Delete</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <p> Are you sure you want to delete this? </p>
                </ModalBody>

                <ModalFooter>
                  <Button onClick={() => handleClick(recipe.id)} colorScheme='red' >Yes</Button>
                  <Button className="ml-2" variant='ghost' mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        ))}
    </div>
  );
}

export default RecipeList;
