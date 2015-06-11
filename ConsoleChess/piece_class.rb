require_relative 'board_class.rb'
require_relative 'game_class.rb'

class Piece
  attr_reader :color
  attr_accessor :board, :pos

  def initialize(starting_pos, board, color)
    @pos = starting_pos
    @board = board
    @color = color
  end


  def valid_moves
    moves.delete_if { |move| move_into_check?(move) }
  end

  def render
    return self.class::SYMBOL
  end


  def move_into_check?(end_pos)
    dupped_board = board.dup

    dupped_board.move!(pos, end_pos)

    dupped_board.in_check?(color)
  end


end

class SlidingPiece < Piece

  def moves

    possible_moves = []

    self.class::DELTAS.each do |(x, y)|
      next_x, next_y  = (pos[0] + x), (pos[1] + y)
      next_pos = [next_x, next_y]

      until next_pos.any? { |coord| !coord.between?(0,7) } ||
        (!board[next_pos].nil? && board[next_pos].color == color)

        possible_moves << next_pos

        break unless board[next_pos].nil?

        next_pos = [(next_pos[0] + x), (next_pos[1] + y)]
      end
    end

    possible_moves.sort
  end

end

class Bishop < SlidingPiece

  DELTAS = [[-1, 1], [-1, -1], [1, -1], [1, 1]]
  SYMBOL = "B"

end

class Rook < SlidingPiece

  DELTAS = [[0, 1], [0, -1], [-1, 0], [1, 0]]
  SYMBOL = "R"

end

class Queen < SlidingPiece

  DELTAS = [[0, 1], [0, -1], [-1, 0],
            [1, 0], [-1, 1], [-1 , -1],
            [1, -1], [1, 1]]
  SYMBOL = "Q"

end

class SteppingPiece < Piece

  def moves
    possible_moves = []

    self.class::DELTAS.each do |(x, y)|
      next_x, next_y  = (pos[0] + x), (pos[1] + y)
      next_pos = [next_x, next_y]

      if next_pos.all? { |coord| coord.between?(0,7) }
        if (!board[next_pos].nil? && board[next_pos].color != color)
          possible_moves << [next_x, next_y]
        elsif board[next_pos].nil?
          possible_moves << [next_x, next_y]
        end
      end
    end

    possible_moves.sort
  end

end

class King < SteppingPiece


    DELTAS = [[0, 1], [0 , -1], [-1, 0], [1, 0], [-1, 1],
    [-1 , -1], [1, -1], [1, 1]]
    SYMBOL = "K"

end

class Knight < SteppingPiece


  DELTAS = [[2, 1], [2 , -1], [-1, 2], [1, 2],
  [-2, 1], [-2 , -1], [-1, -2], [1, -2]]
  SYMBOL = "N"

end

class Pawn < Piece

  SYMBOL = "P"

  attr_reader :first_move

  def initialize(starting_pos, board, color)
    super(starting_pos, board, color)
    @first_move = true # because it has different behavior on first move

  end

  def moves
    possible_moves = []

    if color == :black
      dir = 1
    else
      dir = -1
    end

    left_diag = [pos[0] + dir, pos[1] - 1]
    right_diag = [pos[0] + dir, pos[1] + 1]
    forward = [pos[0] + dir, pos[1]]
    slide_forward = [pos[0] + 2 * dir, pos[1]]

    if first_move && board[forward].nil? && board[slide_forward].nil?
      possible_moves << slide_forward
    end

    if board[forward].nil?
      possible_moves << forward
    elsif !board[left_diag].nil?
      possible_moves << left_diag
    elsif !board[right_diag].nil?
      possible_moves << right_diag
    end

    possible_moves.sort
  end

end
